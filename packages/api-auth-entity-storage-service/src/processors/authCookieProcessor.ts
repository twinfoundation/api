// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	type IRestRouteResponseAuthOptions,
	ResponseHelper,
	type IHttpResponse,
	type IHttpRestRouteProcessor,
	type IHttpServerRequest,
	type IRestRoute
} from "@gtsc/api-models";
import { BaseError, Is } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import { VaultConnectorFactory, type IVaultConnector } from "@gtsc/vault-models";
import { HttpStatusCode } from "@gtsc/web";
import type { IAuthCookieProcessorConfig } from "../models/IAuthCookieProcessorConfig";
import { TokenHelper } from "../utils/tokenHelper";

/**
 * Handle a JWT token in the cookies and validate it to populate request context identity.
 */
export class AuthCookieProcessor implements IHttpRestRouteProcessor {
	/**
	 * The name for the access token as a cookie.
	 * @internal
	 */
	public static readonly COOKIE_NAME: string = "access_token";

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<AuthCookieProcessor>();

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
	 * The name of the cookie to use for the token.
	 * @internal
	 */
	private readonly _cookieName: string;

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
	 * Create a new instance of AuthCookiePreProcessor.
	 * @param options Options for the processor.
	 * @param options.vaultConnectorType The vault for the private keys, defaults to "vault".
	 * @param options.config The configuration for the processor.
	 */
	constructor(options?: { vaultConnectorType?: string; config?: IAuthCookieProcessorConfig }) {
		this._vaultConnector = VaultConnectorFactory.get(options?.vaultConnectorType ?? "vault");
		this._signingKeyName = options?.config?.signingKeyName ?? "auth-signing";
		this._cookieName = options?.config?.cookieName ?? AuthCookieProcessor.COOKIE_NAME;
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
	 * Pre process the REST request for the specified route.
	 * @param request The incoming request.
	 * @param response The outgoing response.
	 * @param route The route to process.
	 * @param requestContext The context for the request.
	 * @param state The state for the request.
	 */
	public async pre(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestContext: IServiceRequestContext,
		state: { [id: string]: unknown }
	): Promise<void> {
		if (!Is.empty(route) && !(route.skipAuth ?? false)) {
			const cookiesHeader = request.headers?.cookie;
			let token: string | undefined;

			if (Is.notEmpty(cookiesHeader)) {
				const cookies = Is.arrayValue(cookiesHeader) ? cookiesHeader : [cookiesHeader];
				for (const cookie of cookies) {
					if (Is.stringValue(cookie)) {
						const accessTokenCookie = cookie
							.split(";")
							.map(c => c.trim())
							.find(c => c.startsWith(this._cookieName));
						if (Is.stringValue(accessTokenCookie)) {
							token = accessTokenCookie.slice(this._cookieName.length + 1).trim();
							break;
						}
					}
				}
			}

			try {
				const headerAndPayload = await TokenHelper.verify(
					this._systemIdentity,
					this._systemPartitionId,
					this._vaultConnector,
					this._signingKeyName,
					token
				);

				requestContext.userIdentity = headerAndPayload.payload?.sub;
			} catch (err) {
				const error = BaseError.fromError(err);
				ResponseHelper.buildError(response, error, HttpStatusCode.unauthorized);
			}
		}
	}

	/**
	 * Post process the REST request for the specified route.
	 * @param request The incoming request.
	 * @param response The outgoing response.
	 * @param route The route to process.
	 * @param requestContext The context for the request.
	 * @param state The state for the request.
	 */
	public async post(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestContext: IServiceRequestContext,
		state: { [id: string]: unknown }
	): Promise<void> {
		const responseAuthOptions = state?.auth as IRestRouteResponseAuthOptions | undefined;

		if (!Is.empty(route) && Is.object(responseAuthOptions)) {
			if (
				(responseAuthOptions.operation === "login" ||
					responseAuthOptions.operation === "refresh") &&
				Is.stringValue(response.body?.token)
			) {
				response.headers ??= {};
				response.headers["Set-Cookie"] =
					`${this._cookieName}=${response.body.token}; Secure; HttpOnly; SameSite=None; Path=/`;
				delete response.body.token;
			} else if (responseAuthOptions.operation === "logout") {
				response.headers ??= {};
				response.headers["Set-Cookie"] =
					`${this._cookieName}=; Max-Age=0; Secure; HttpOnly; SameSite=None; Path=/`;
			}
		}
	}
}
