// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	ResponseHelper,
	type IHttpResponse,
	type IHttpRestRouteProcessor,
	type IHttpServerRequest,
	type IRestRoute
} from "@gtsc/api-models";
import { Is, UnauthorizedError } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import { VaultConnectorFactory, type IVaultConnector } from "@gtsc/vault-models";
import { HttpStatusCode, Jwt } from "@gtsc/web";
import type { IEntityStorageAuthenticationProcessorConfig } from "../models/IEntityStorageAuthenticationProcessorConfig";

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
	 * The system identity.
	 * @internal
	 */
	private _systemIdentity?: string;

	/**
	 * The system partition id to use for the vault.
	 * @internal
	 */
	private _systemPartitionId?: string;

	/**
	 * Create a new instance of EntityStorageAuthenticationProcessor.
	 * @param options Options for the processor.
	 * @param options.vaultConnectorType The vault for the private keys, defaults to "vault".
	 * @param options.config The configuration for the processor.
	 */
	constructor(options?: {
		vaultConnectorType?: string;
		config?: IEntityStorageAuthenticationProcessorConfig;
	}) {
		this._vaultConnector = VaultConnectorFactory.get(options?.vaultConnectorType ?? "vault");
		this._signingKeyName = options?.config?.signingKeyName ?? "auth-signing";
	}

	/**
	 * The service needs to be started when the application is initialized.
	 * @param systemRequestContext The system request context.
	 * @param systemLoggingConnectorType The system logging connector type, defaults to "system-logging".
	 * @returns Nothing.
	 */
	public async start(
		systemRequestContext: IServiceRequestContext,
		systemLoggingConnectorType?: string
	): Promise<void> {
		this._systemPartitionId = systemRequestContext.partitionId;
		this._systemIdentity = systemRequestContext.systemIdentity;
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
		if (!Is.empty(route) && !(route.skipAuth ?? false)) {
			let jwt: string | undefined;
			const authHeader = request.headers?.authorization;

			if (Is.stringValue(authHeader)) {
				const parts = authHeader.split(" ");
				if (parts.length === 2 && parts[0] === "Bearer") {
					jwt = parts[1];
				}
			}

			if (!Is.stringValue(jwt)) {
				ResponseHelper.buildError(
					response,
					{
						name: UnauthorizedError.CLASS_NAME,
						message: `${this.CLASS_NAME}.missing`
					},
					HttpStatusCode.unauthorized
				);
			} else {
				const systemRequestContext: IServiceRequestContext = {
					systemIdentity: this._systemIdentity,
					userIdentity: this._systemIdentity,
					partitionId: this._systemPartitionId
				};

				const decoded = await Jwt.verifyWithVerifier(jwt, async (alg, key, payload, signature) =>
					this._vaultConnector.verify(
						this._signingKeyName,
						payload,
						signature,
						systemRequestContext
					)
				);

				// If the signature validation failed then it is unauthorized.
				if (!decoded.verified) {
					ResponseHelper.buildError(
						response,
						{
							name: UnauthorizedError.CLASS_NAME,
							message: `${this.CLASS_NAME}.invalid`
						},
						HttpStatusCode.unauthorized
					);
				} else if (
					!Is.empty(decoded.payload?.exp) &&
					decoded.payload.exp < Math.trunc(Date.now() / 1000)
				) {
					// If the token has expired then it is unauthorized.
					ResponseHelper.buildError(
						response,
						{
							name: UnauthorizedError.CLASS_NAME,
							message: `${this.CLASS_NAME}.expired`
						},
						HttpStatusCode.unauthorized
					);
				} else {
					requestContext.userIdentity = decoded.payload?.sub;
				}
			}
		}
	}
}
