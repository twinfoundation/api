// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, UnauthorizedError } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import type { IVaultConnector } from "@gtsc/vault-models";
import { type IJwtHeader, type IJwtPayload, Jwt, JwtAlgorithms } from "@gtsc/web";

/**
 * Helper class for token operations.
 */
export class TokenHelper {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<TokenHelper>();

	/**
	 * Create a new token.
	 * @param systemIdentity The system identity.
	 * @param systemPartitionId The system partition id.
	 * @param vaultConnector The vault connector.
	 * @param signingKeyName The signing key name.
	 * @param subject The subject for the token.
	 * @param ttlMinutes The time to live for the token in minutes.
	 * @returns The new token.
	 */
	public static async createToken(
		systemIdentity: string | undefined,
		systemPartitionId: string | undefined,
		vaultConnector: IVaultConnector,
		signingKeyName: string,
		subject: string,
		ttlMinutes: number
	): Promise<string> {
		// Verify was a success so we can now generate a new token.
		const nowSeconds = Math.trunc(Date.now() / 1000);
		const ttlSeconds = ttlMinutes * 60;

		const systemRequestContext: IServiceRequestContext = {
			systemIdentity,
			userIdentity: systemIdentity,
			partitionId: systemPartitionId
		};

		const jwt = await Jwt.encodeWithSigner(
			{ alg: JwtAlgorithms.EdDSA },
			{
				sub: subject,
				exp: nowSeconds + ttlSeconds
			},
			async (alg, key, payload) =>
				vaultConnector.sign(signingKeyName, payload, systemRequestContext)
		);

		return jwt;
	}

	/**
	 * Verify the token.
	 * @param systemIdentity The system identity.
	 * @param systemPartitionId The system partition id.
	 * @param vaultConnector The vault connector.
	 * @param signingKeyName The signing key name.
	 * @param token The token to verify.
	 * @returns The verified details.
	 * @throws UnauthorizedError if the token is missing, invalid or expired.
	 */
	public static async verify(
		systemIdentity: string | undefined,
		systemPartitionId: string | undefined,
		vaultConnector: IVaultConnector,
		signingKeyName: string,
		token: string | undefined
	): Promise<{
		header: IJwtHeader;
		payload: IJwtPayload;
	}> {
		if (!Is.stringValue(token)) {
			throw new UnauthorizedError(this._CLASS_NAME, "missing");
		}

		const systemRequestContext: IServiceRequestContext = {
			systemIdentity,
			userIdentity: systemIdentity,
			partitionId: systemPartitionId
		};

		const decoded = await Jwt.verifyWithVerifier(token, async (alg, key, payload, signature) =>
			vaultConnector.verify(signingKeyName, payload, signature, systemRequestContext)
		);

		// If the signature validation failed or some of the header/payload data
		// is not properly populated then it is unauthorized.
		if (
			!decoded.verified ||
			!Is.object(decoded.header) ||
			!Is.object(decoded.payload) ||
			!Is.stringValue(decoded.payload.sub)
		) {
			throw new UnauthorizedError(this._CLASS_NAME, "invalidToken");
		} else if (
			!Is.empty(decoded.payload?.exp) &&
			decoded.payload.exp < Math.trunc(Date.now() / 1000)
		) {
			throw new UnauthorizedError(this._CLASS_NAME, "expired");
		}

		return {
			header: decoded.header,
			payload: decoded.payload
		};
	}
}
