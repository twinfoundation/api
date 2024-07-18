// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpResponse,
	IHttpRestRouteProcessor,
	IHttpServerRequest,
	IRestRoute
} from "@gtsc/api-models";
import { Guards, Is, UnauthorizedError } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import { HttpStatusCode, Jwt } from "@gtsc/web";

/**
 * Handle a JWT token in the headers or cookie and validate it to populate request context identity.
 */
export class JwtIdentityProcessor implements IHttpRestRouteProcessor {
	/**
	 * The name of the cookie to look for the access token.
	 * @internal
	 */
	private static readonly _COOKIE_NAME: string = "access_token";

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<JwtIdentityProcessor>();

	/**
	 * The key for verifying the JWT token.
	 * @internal
	 */
	private readonly _key: Uint8Array;

	/**
	 * Create a new instance of JwtIdentityProcessor.
	 * @param options Options for the processor.
	 * @param options.key The key for verifying the JWT token.
	 * @returns Promise that resolves when the processor is initialized.
	 */
	constructor(options: { key: Uint8Array }) {
		Guards.object(this.CLASS_NAME, nameof(options), options);
		Guards.uint8Array(this.CLASS_NAME, nameof(options.key), options.key);
		this._key = options.key;
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
			const cookieHeader = request.headers?.cookie;

			if (Is.stringValue(authHeader)) {
				const parts = authHeader.split(" ");
				if (parts.length === 2 && parts[0] === "Bearer") {
					jwt = parts[1];
				}
			} else if (Is.notEmpty(cookieHeader)) {
				const cookies = Is.arrayValue(cookieHeader) ? cookieHeader : [cookieHeader];
				for (const cookie of cookies) {
					if (Is.stringValue(cookie)) {
						const accessTokenCookie = cookie
							.split(";")
							.map(c => c.trim())
							.find(c => c.startsWith(JwtIdentityProcessor._COOKIE_NAME));

						if (Is.stringValue(accessTokenCookie)) {
							jwt = accessTokenCookie.slice(JwtIdentityProcessor._COOKIE_NAME.length + 1).trim();
							break;
						}
					}
				}
			}

			if (!Is.stringValue(jwt)) {
				response.body = {
					name: UnauthorizedError.CLASS_NAME,
					message: `${this.CLASS_NAME}.jwtMissing`
				};
				response.statusCode = HttpStatusCode.unauthorized;
			} else {
				const decoded = await Jwt.verify(jwt, this._key);

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
