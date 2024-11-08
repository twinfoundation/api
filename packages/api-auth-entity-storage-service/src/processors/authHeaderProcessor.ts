// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	HttpErrorHelper,
	type IBaseRoute,
	type IBaseRouteProcessor,
	type IHttpRequestIdentity,
	type IHttpResponse,
	type IHttpServerRequest
} from "@twin.org/api-models";
import { BaseError, Guards, Is } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { VaultConnectorFactory, type IVaultConnector } from "@twin.org/vault-models";
import { HeaderTypes, HttpStatusCode } from "@twin.org/web";
import type { IAuthHeaderProcessorConfig } from "../models/IAuthHeaderProcessorConfig";
import { TokenHelper } from "../utils/tokenHelper";

/**
 * Handle a JWT token in the authorization header or cookies and validate it to populate request context identity.
 */
export class AuthHeaderProcessor implements IBaseRouteProcessor {
	/**
	 * The default name for the access token as a cookie.
	 * @internal
	 */
	public static readonly DEFAULT_COOKIE_NAME: string = "access_token";

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<AuthHeaderProcessor>();

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
	 * The node identity.
	 * @internal
	 */
	private _nodeIdentity?: string;

	/**
	 * Create a new instance of AuthCookiePreProcessor.
	 * @param options Options for the processor.
	 * @param options.vaultConnectorType The vault for the private keys, defaults to "vault".
	 * @param options.config The configuration for the processor.
	 */
	constructor(options?: { vaultConnectorType?: string; config?: IAuthHeaderProcessorConfig }) {
		this._vaultConnector = VaultConnectorFactory.get(options?.vaultConnectorType ?? "vault");
		this._signingKeyName = options?.config?.signingKeyName ?? "auth-signing";
		this._cookieName = options?.config?.cookieName ?? AuthHeaderProcessor.DEFAULT_COOKIE_NAME;
	}

	/**
	 * The service needs to be started when the application is initialized.
	 * @param nodeIdentity The identity of the node.
	 * @param nodeLoggingConnectorType The node logging connector type, defaults to "node-logging".
	 * @returns Nothing.
	 */
	public async start(nodeIdentity: string, nodeLoggingConnectorType?: string): Promise<void> {
		Guards.string(this.CLASS_NAME, nameof(nodeIdentity), nodeIdentity);
		this._nodeIdentity = nodeIdentity;
	}

	/**
	 * Pre process the REST request for the specified route.
	 * @param request The incoming request.
	 * @param response The outgoing response.
	 * @param route The route to process.
	 * @param requestIdentity The identity context for the request.
	 * @param processorState The state handed through the processors.
	 */
	public async pre(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IBaseRoute | undefined,
		requestIdentity: IHttpRequestIdentity,
		processorState: { [id: string]: unknown }
	): Promise<void> {
		if (!Is.empty(route) && !(route.skipAuth ?? false)) {
			try {
				const tokenAndLocation = TokenHelper.extractTokenFromHeaders(
					request.headers,
					this._cookieName
				);

				const headerAndPayload = await TokenHelper.verify(
					this._vaultConnector,
					`${this._nodeIdentity}/${this._signingKeyName}`,
					tokenAndLocation?.token
				);

				requestIdentity.userIdentity = headerAndPayload.payload?.sub;
				processorState.authToken = tokenAndLocation?.token;
				processorState.authTokenLocation = tokenAndLocation?.location;
			} catch (err) {
				const error = BaseError.fromError(err);
				HttpErrorHelper.buildResponse(response, error, HttpStatusCode.unauthorized);
			}
		}
	}

	/**
	 * Post process the REST request for the specified route.
	 * @param request The incoming request.
	 * @param response The outgoing response.
	 * @param route The route to process.
	 * @param requestIdentity The identity context for the request.
	 * @param processorState The state handed through the processors.
	 */
	public async post(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IBaseRoute | undefined,
		requestIdentity: IHttpRequestIdentity,
		processorState: { [id: string]: unknown }
	): Promise<void> {
		const responseAuthOperation = processorState?.authOperation;

		// We don't populate the cookie if the incoming request was from an authorization header.
		if (
			!Is.empty(route) &&
			Is.stringValue(responseAuthOperation) &&
			processorState.authTokenLocation !== "authorization"
		) {
			if (
				(responseAuthOperation === "login" || responseAuthOperation === "refresh") &&
				Is.stringValue(response.body?.token)
			) {
				response.headers ??= {};
				response.headers[HeaderTypes.SetCookie] =
					`${this._cookieName}=${response.body.token}; Secure; HttpOnly; SameSite=None; Path=/`;
				delete response.body.token;
			} else if (responseAuthOperation === "logout") {
				response.headers ??= {};
				response.headers[HeaderTypes.SetCookie] =
					`${this._cookieName}=; Max-Age=0; Secure; HttpOnly; SameSite=None; Path=/`;
			}
		}
	}
}
