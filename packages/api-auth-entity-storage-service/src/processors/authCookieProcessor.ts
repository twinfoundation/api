// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	ResponseHelper,
	type IHttpResponse,
	type IHttpRestRouteProcessor,
	type IHttpServerRequest,
	type IRestRoute
} from "@gtsc/api-models";
import { BaseError, Guards, Is } from "@gtsc/core";
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
	 * @param systemIdentity The identity of the system.
	 * @param systemLoggingConnectorType The system logging connector type, defaults to "system-logging".
	 * @returns Nothing.
	 */
	public async start(systemIdentity: string, systemLoggingConnectorType?: string): Promise<void> {
		Guards.string(this.CLASS_NAME, nameof(systemIdentity), systemIdentity);
		this._systemIdentity = systemIdentity;
	}

	/**
	 * Pre process the REST request for the specified route.
	 * @param request The incoming request.
	 * @param response The outgoing response.
	 * @param route The route to process.
	 * @param requestContext The context for the request.
	 * @param processorState The state handed through the processors.
	 */
	public async pre(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestContext: IServiceRequestContext,
		processorState: { [id: string]: unknown }
	): Promise<void> {
		if (!Is.empty(route) && !(route.skipAuth ?? false)) {
			try {
				const token = TokenHelper.extractTokenFromHeaders(request.headers, this._cookieName);

				const headerAndPayload = await TokenHelper.verify(
					this._systemIdentity,
					this._vaultConnector,
					this._signingKeyName,
					token
				);

				requestContext.userIdentity = headerAndPayload.payload?.sub;
				processorState.authToken = token;
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
	 * @param processorState The state handed through the processors.
	 */
	public async post(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestContext: IServiceRequestContext,
		processorState: { [id: string]: unknown }
	): Promise<void> {
		const responseAuthOperation = processorState?.authOperation;

		if (!Is.empty(route) && Is.stringValue(responseAuthOperation)) {
			if (
				(responseAuthOperation === "login" || responseAuthOperation === "refresh") &&
				Is.stringValue(response.body?.token)
			) {
				response.headers ??= {};
				response.headers["Set-Cookie"] =
					`${this._cookieName}=${response.body.token}; Secure; HttpOnly; SameSite=None; Path=/`;
				delete response.body.token;
			} else if (responseAuthOperation === "logout") {
				response.headers ??= {};
				response.headers["Set-Cookie"] =
					`${this._cookieName}=; Max-Age=0; Secure; HttpOnly; SameSite=None; Path=/`;
			}
		}
	}
}
