// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpResponse,
	IHttpRestRouteProcessor,
	IHttpServerRequest,
	IRestRoute
} from "@gtsc/api-models";
import { Is, UnauthorizedError } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import { VaultConnectorFactory, type IVaultConnector } from "@gtsc/vault-models";
import { HttpStatusCode, Jwt } from "@gtsc/web";

/**
 * Handle a JWT token in the headers and validate it to populate request context identity.
 */
export class EntityStorageAuthenticationProcessor implements IHttpRestRouteProcessor {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<EntityStorageAuthenticationProcessor>();

	/**
	 * The vault for the keys.
	 * @internal
	 */
	private readonly _vaultConnector: IVaultConnector;

	/**
	 * The name of the key to retrieve from the vault for signing JWT.
	 * @internal
	 */
	private readonly _signingKeyName: string;

	/**
	 * The system partition id to use for the vault.
	 * @internal
	 */
	private _systemPartitionId?: string;

	/**
	 * Create a new instance of JwtAuthenticationProcessor.
	 * @param options Options for the processor.
	 * @param options.vaultConnectorType The vault for the private keys, defaults to "vault".
	 * @param options.signingKeyName The name of the key to retrieve from the vault for verifying the JWT, defaults to "auth-signing".
	 */
	constructor(options: { vaultConnectorType?: string; signingKeyName?: string }) {
		this._vaultConnector = VaultConnectorFactory.get(options?.vaultConnectorType ?? "vault");
		this._signingKeyName = options?.signingKeyName ?? "auth-signing";
	}

	/**
	 * The service needs to be started when the application is initialized.
	 * @param systemPartitionId The system partition id.
	 * @returns Nothing.
	 */
	public async start(systemPartitionId: string): Promise<void> {
		this._systemPartitionId = systemPartitionId;
	}

	/**
	 * Process the REST request for the specified route.
	 * @param request The incoming request.
	 * @param response The outgoing response.
	 * @param route The route to process.
	 * @param requestContext The context for the request.
	 * @param state The state for the request.
	 */
	public async process(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestContext: IServiceRequestContext,
		state: { [id: string]: unknown }
	): Promise<void> {
		if (!(route?.skipAuth ?? false)) {
			let jwt: string | undefined;
			const authHeader = request.headers?.authorization;

			if (Is.stringValue(authHeader)) {
				const parts = authHeader.split(" ");
				if (parts.length === 2 && parts[0] === "Bearer") {
					jwt = parts[1];
				}
			}

			if (!Is.stringValue(jwt)) {
				response.body = {
					name: UnauthorizedError.CLASS_NAME,
					message: `${this.CLASS_NAME}.jwtMissing`
				};
				response.statusCode = HttpStatusCode.unauthorized;
			} else {
				const decoded = await Jwt.verifyWithVerifier(jwt, async (alg, key, payload, signature) =>
					this._vaultConnector.verify(this._signingKeyName, payload, signature, {
						partitionId: this._systemPartitionId
					})
				);

				// If the signature validation failed then it is unauthorized.
				if (!decoded.verified) {
					response.body = {
						name: UnauthorizedError.CLASS_NAME,
						message: `${this.CLASS_NAME}.jwtSignatureInvalid`
					};
					response.statusCode = HttpStatusCode.unauthorized;
				} else if (
					!Is.empty(decoded.payload?.exp) &&
					decoded.payload.exp < Math.floor(Date.now() / 1000)
				) {
					// If the token has expired then it is unauthorized.
					response.body = {
						name: UnauthorizedError.CLASS_NAME,
						message: `${this.CLASS_NAME}.jwtExpired`
					};
					response.statusCode = HttpStatusCode.unauthorized;
				} else {
					requestContext.identity = decoded.payload?.sub;
				}
			}
		}
	}
}
