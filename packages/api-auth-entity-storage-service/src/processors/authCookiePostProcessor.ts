// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpResponse,
	IHttpRestRouteProcessor,
	IHttpServerRequest,
	IRestRoute,
	IRestRouteResponseAuthOptions
} from "@gtsc/api-models";
import { Is } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import { AuthCookiePreProcessor } from "./authCookiePreProcessor";
import type { AuthCookiePreProcessorConfig } from "../models/IAuthCookiePreProcessorConfig";

/**
 * Store a JWT token in cookies when a new token is created.
 */
export class AuthCookiePostProcessor implements IHttpRestRouteProcessor {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<AuthCookiePostProcessor>();

	/**
	 * The name of the cookie to use for the token.
	 * @internal
	 */
	private readonly _cookieName: string;

	/**
	 * Create a new instance of AuthCookiePostProcessor.
	 * @param options Options for the processor.
	 * @param options.config The configuration for the processor.
	 */
	constructor(options?: { config?: AuthCookiePreProcessorConfig }) {
		this._cookieName = options?.config?.cookieName ?? AuthCookiePreProcessor.COOKIE_NAME;
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
		const responseAuthOptions = state?.auth as IRestRouteResponseAuthOptions | undefined;

		if (!Is.empty(route) && Is.object(responseAuthOptions)) {
			if (
				(responseAuthOptions.operation === "login" ||
					responseAuthOptions.operation === "refresh") &&
				Is.stringValue(response.body?.token)
			) {
				response.headers ??= {};
				response.headers["Set-Cookie"] =
					`${this._cookieName}=${response.body?.token}; Secure; HttpOnly; SameSite=None; Path=/`;
				delete response.body?.token;
			} else if (responseAuthOptions.operation === "logout") {
				response.headers ??= {};
				response.headers["Set-Cookie"] =
					`${this._cookieName}=; Max-Age=0; Secure; HttpOnly; SameSite=None; Path=/`;
			}
		}
	}
}
