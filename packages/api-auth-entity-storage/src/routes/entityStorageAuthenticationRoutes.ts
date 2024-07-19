// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpRequestContext,
	IRestRoute,
	ITag,
	IUnauthorizedResponse
} from "@gtsc/api-models";
import { Guards } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { ServiceFactory } from "@gtsc/services";
import type { ILoginRequest } from "../models/api/ILoginRequest";
import type { ILoginResponse } from "../models/api/ILoginResponse";
import type { IAuthentication } from "../models/IAuthentication";

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
 * @param factoryServiceName The name of the service to use in the routes store in the ServiceFactory.
 * @returns The generated routes.
 */
export function generateRestRoutesAuthentication(
	baseRouteName: string,
	factoryServiceName: string
): IRestRoute[] {
	const loginRoute: IRestRoute<ILoginRequest, ILoginResponse> = {
		operationId: "authenticationLogin",
		summary: "Login to the server",
		tag: tagsAuthentication[0].name,
		method: "GET",
		path: `${baseRouteName}/`,
		handler: async (requestContext, request) =>
			authenticationLogin(requestContext, factoryServiceName, request),
		responseType: [
			{
				type: nameof<ILoginResponse>(),
				examples: [
					{
						id: "loginResponse",
						description: "The response for the login request.",
						response: {
							body: {
								token: "eyJhbGciOiJIU...sw5c"
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

	return [loginRoute];
}

/**
 * Login to the server.
 * @param requestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function authenticationLogin(
	requestContext: IHttpRequestContext,
	factoryServiceName: string,
	request: ILoginRequest
): Promise<ILoginResponse> {
	Guards.object<ILoginRequest>(ROUTES_SOURCE, nameof(request), request);
	Guards.object<ILoginRequest["body"]>(ROUTES_SOURCE, nameof(request.body), request.body);

	const service = ServiceFactory.get<IAuthentication>(factoryServiceName);
	return {
		body: {
			token: await service.login(request.body.email, request.body.password, requestContext)
		}
	};
}
