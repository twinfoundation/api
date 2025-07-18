// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is, UnauthorizedError } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { type IVaultConnector, VaultConnectorHelper } from "@twin.org/vault-models";
import {
	HeaderTypes,
	type IHttpHeaders,
	type IJwtHeader,
	type IJwtPayload,
	Jwt
} from "@twin.org/web";

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
	 * @param vaultConnector The vault connector.
	 * @param signingKeyName The signing key name.
	 * @param subject The subject for the token.
	 * @param ttlMinutes The time to live for the token in minutes.
	 * @returns The new token and its expiry date.
	 */
	public static async createToken(
		vaultConnector: IVaultConnector,
		signingKeyName: string,
		subject: string,
		ttlMinutes: number
	): Promise<{
		token: string;
		expiry: number;
	}> {
		const nowSeconds = Math.trunc(Date.now() / 1000);
		const ttlSeconds = ttlMinutes * 60;

		const jwt = await Jwt.encodeWithSigner(
			{ alg: "EdDSA" },
			{
				sub: subject,
				exp: nowSeconds + ttlSeconds
			},
			async (header, payload) =>
				VaultConnectorHelper.jwtSigner(vaultConnector, signingKeyName, header, payload)
		);

		return {
			token: jwt,
			expiry: (nowSeconds + ttlSeconds) * 1000
		};
	}

	/**
	 * Verify the token.
	 * @param vaultConnector The vault connector.
	 * @param signingKeyName The signing key name.
	 * @param token The token to verify.
	 * @returns The verified details.
	 * @throws UnauthorizedError if the token is missing, invalid or expired.
	 */
	public static async verify(
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

		const decoded = await Jwt.verifyWithVerifier(token, async t =>
			VaultConnectorHelper.jwtVerifier(vaultConnector, signingKeyName, t)
		);

		// If some of the header/payload data is not properly populated then it is unauthorized.
		if (!Is.stringValue(decoded.payload.sub)) {
			throw new UnauthorizedError(this._CLASS_NAME, "payloadMissingSubject");
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

	/**
	 * Extract the auth token from the headers, either from the authorization header or the cookie header.
	 * @param headers The headers to extract the token from.
	 * @param cookieName The name of the cookie to extract the token from.
	 * @returns The token if found.
	 */
	public static extractTokenFromHeaders(
		headers?: IHttpHeaders,
		cookieName?: string
	):
		| {
				token: string;
				location: "authorization" | "cookie";
		  }
		| undefined {
		const authHeader = headers?.[HeaderTypes.Authorization];
		const cookiesHeader = headers?.[HeaderTypes.Cookie];

		if (Is.string(authHeader) && authHeader.startsWith("Bearer ")) {
			return {
				token: authHeader.slice(7).trim(),
				location: "authorization"
			};
		} else if (Is.notEmpty(cookiesHeader) && Is.stringValue(cookieName)) {
			const cookies = Is.arrayValue(cookiesHeader) ? cookiesHeader : [cookiesHeader];
			for (const cookie of cookies) {
				if (Is.stringValue(cookie)) {
					const accessTokenCookie = cookie
						.split(";")
						.map(c => c.trim())
						.find(c => c.startsWith(cookieName));
					if (Is.stringValue(accessTokenCookie)) {
						return {
							token: accessTokenCookie.slice(cookieName.length + 1).trim(),
							location: "cookie"
						};
					}
				}
			}
		}
	}
}
