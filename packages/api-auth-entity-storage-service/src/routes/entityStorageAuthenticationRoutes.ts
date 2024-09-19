// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IAuthenticationComponent,
	ILoginRequest,
	ILoginResponse,
	ILogoutRequest,
	IRefreshTokenRequest,
	IRefreshTokenResponse
} from "@twin.org/api-auth-entity-storage-models";
import type {
	IHttpRequestContext,
	INoContentResponse,
	IRestRoute,
	IRestRouteResponseOptions,
	ITag,
	IUnauthorizedResponse
} from "@twin.org/api-models";
import { ComponentFactory, Guards } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { HttpStatusCode } from "@twin.org/web";

/**
 * The source used when communicating about these routes.
 */
const ROUTES_SOURCE = "authenticationRoutes";

/**
 * The tag to associate with the routes.
 */
export const tagsAuthentication: ITag[] = [
	{
		name: "Authentication",
		description: "Authentication endpoints for the REST server."
	}
];

/**
 * The REST routes for authentication.
 * @param baseRouteName Prefix to prepend to the paths.
 * @param componentName The name of the component to use in the routes stored in the ComponentFactory.
 * @returns The generated routes.
 */
export function generateRestRoutesAuthentication(
	baseRouteName: string,
	componentName: string
): IRestRoute[] {
	const loginRoute: IRestRoute<ILoginRequest, ILoginResponse> = {
		operationId: "authenticationLogin",
		summary: "Login to the server",
		tag: tagsAuthentication[0].name,
		method: "POST",
		path: `${baseRouteName}/login`,
		handler: async (httpRequestContext, request) =>
			authenticationLogin(httpRequestContext, componentName, request),
		requestType: {
			type: nameof<ILoginRequest>(),
			examples: [
				{
					id: "loginRequestExample",
					description: "The request to login to the server.",
					request: {
						body: {
							email: "user@example.com",
							password: "MyPassword123!"
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<ILoginResponse>(),
				examples: [
					{
						id: "loginResponseExample",
						description: "The response for the login request.",
						response: {
							body: {
								token: "eyJhbGciOiJIU...sw5c",
								expiry: 1722514341067
							}
						}
					}
				]
			},
			{
				type: nameof<IUnauthorizedResponse>()
			}
		],
		skipAuth: true
	};

	const logoutRoute: IRestRoute<ILogoutRequest, INoContentResponse> = {
		operationId: "authenticationLogout",
		summary: "Logout from the server",
		tag: tagsAuthentication[0].name,
		method: "GET",
		path: `${baseRouteName}/logout`,
		handler: async (httpRequestContext, request) =>
			authenticationLogout(httpRequestContext, componentName, request),
		requestType: {
			type: nameof<ILogoutRequest>(),
			examples: [
				{
					id: "logoutRequestExample",
					description: "The request to logout from the server.",
					request: {
						query: {
							token: "eyJhbGciOiJIU...sw5c"
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<INoContentResponse>()
			}
		],
		skipAuth: true
	};

	const refreshTokenRoute: IRestRoute<IRefreshTokenRequest, IRefreshTokenResponse> = {
		operationId: "authenticationRefreshToken",
		summary: "Refresh an authentication token",
		tag: tagsAuthentication[0].name,
		method: "GET",
		path: `${baseRouteName}/refresh`,
		handler: async (httpRequestContext, request) =>
			authenticationRefreshToken(httpRequestContext, componentName, request),
		requestType: {
			type: nameof<IRefreshTokenRequest>(),
			examples: [
				{
					id: "refreshTokenRequestExample",
					description: "The request to refresh an auth token.",
					request: {
						query: {
							token: "eyJhbGciOiJIU...sw5c"
						}
					}
				}
			]
		},
		responseType: [
			{
				type: nameof<IRefreshTokenResponse>(),
				examples: [
					{
						id: "refreshTokenResponseExample",
						description: "The response for the refresh token request.",
						response: {
							body: {
								token: "eyJhbGciOiJIU...sw5c",
								expiry: 1722514341067
							}
						}
					}
				]
			},
			{
				type: nameof<IUnauthorizedResponse>()
			}
		]
	};

	return [loginRoute, logoutRoute, refreshTokenRoute];
}

/**
 * Login to the server.
 * @param httpRequestContext The request context for the API.
 * @param componentName The name of the component to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function authenticationLogin(
	httpRequestContext: IHttpRequestContext,
	componentName: string,
	request: ILoginRequest
): Promise<ILoginResponse & IRestRouteResponseOptions> {
	Guards.object<ILoginRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.object<ILoginRequest["body"]>(ROUTES_SOURCE, nameof(request.body), request.body);

	const component = ComponentFactory.get<IAuthenticationComponent>(componentName);
	const result = await component.login(request.body.email, request.body.password);

	// Need to give a hint to any auth processors about the operation
	// in case they need to manipulate the response
	httpRequestContext.processorState.authOperation = "login";

	return {
		body: result
	};
}

/**
 * Logout from the server.
 * @param httpRequestContext The request context for the API.
 * @param componentName The name of the component to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function authenticationLogout(
	httpRequestContext: IHttpRequestContext,
	componentName: string,
	request: ILogoutRequest
): Promise<INoContentResponse & IRestRouteResponseOptions> {
	Guards.object<ILogoutRequest>(ROUTES_SOURCE, nameof(request), request);

	const component = ComponentFactory.get<IAuthenticationComponent>(componentName);
	await component.logout(request.query?.token);

	// Need to give a hint to any auth processors about the operation
	// in case they need to manipulate the response
	httpRequestContext.processorState.authOperation = "logout";

	return {
		statusCode: HttpStatusCode.noContent
	};
}

/**
 * Refresh the login token.
 * @param httpRequestContext The request context for the API.
 * @param componentName The name of the component to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function authenticationRefreshToken(
	httpRequestContext: IHttpRequestContext,
	componentName: string,
	request: IRefreshTokenRequest
): Promise<IRefreshTokenResponse & IRestRouteResponseOptions> {
	Guards.object<IRefreshTokenRequest>(ROUTES_SOURCE, nameof(request), request);

	const component = ComponentFactory.get<IAuthenticationComponent>(componentName);

	// If the token is not in the query, then maybe an auth processor has extracted it
	// and stored it in the processor state
	const token = request.query?.token ?? (httpRequestContext.processorState.authToken as string);
	const result = await component.refresh(token);

	// Need to give a hint to any auth processors about the operation
	// in case they need to manipulate the response
	httpRequestContext.processorState.authOperation = "refresh";

	return {
		body: result
	};
}
