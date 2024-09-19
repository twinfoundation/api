// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpRequestContext,
	IInformationComponent,
	INoContentRequest,
	INoContentResponse,
	IRestRoute,
	IServerHealthResponse,
	IServerInfoResponse,
	IServerSpecResponse,
	ITag
} from "@twin.org/api-models";
import { ComponentFactory, Is } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { HttpStatusCode } from "@twin.org/web";

/**
 * The tag to associate with the routes.
 */
export const tagsInformation: ITag[] = [
	{
		name: "Info",
		description: "Information endpoints for the REST server."
	}
];

/**
 * The REST routes for server information.
 * @param baseRouteName Prefix to prepend to the paths.
 * @param componentName The name of the component to use in the routes stored in the ComponentFactory.
 * @returns The generated routes.
 */
export function generateRestRoutesInformation(
	baseRouteName: string,
	componentName: string
): IRestRoute[] {
	const rootRoute: IRestRoute = {
		operationId: "serverRoot",
		summary: "Get the root blank page",
		tag: tagsInformation[0].name,
		method: "GET",
		path: `${baseRouteName}/`,
		handler: async () => ({}),
		responseType: [
			{
				type: nameof<INoContentResponse>()
			}
		],
		excludeFromSpec: true,
		skipAuth: true
	};

	const informationRoute: IRestRoute<INoContentRequest, IServerInfoResponse> = {
		operationId: "serverInformation",
		summary: "Get the information for the server",
		tag: tagsInformation[0].name,
		method: "GET",
		path: `${baseRouteName}/info`,
		handler: async (httpRequestContext, request) =>
			serverInfo(httpRequestContext, componentName, request),
		responseType: [
			{
				type: nameof<IServerInfoResponse>(),
				examples: [
					{
						id: "informationResponse",
						description: "The response for the information request.",
						response: {
							body: {
								name: "API Server",
								version: "1.0.0"
							}
						}
					}
				]
			}
		],
		skipAuth: true
	};

	const healthRoute: IRestRoute<INoContentRequest, IServerHealthResponse> = {
		operationId: "serverHealth",
		summary: "Get the health for the server",
		tag: tagsInformation[0].name,
		method: "GET",
		path: `${baseRouteName}/health`,
		handler: async (httpRequestContext, request) =>
			serverHealth(httpRequestContext, componentName, request),
		responseType: [
			{
				type: nameof<IServerHealthResponse>(),
				examples: [
					{
						id: "healthResponseOK",
						description: "The response for the health request.",
						response: {
							body: {
								status: "ok",
								components: [
									{
										name: "Database",
										status: "ok"
									},
									{
										name: "Storage",
										status: "ok"
									}
								]
							}
						}
					},
					{
						id: "healthResponseWarning",
						description: "The response for the health request with warnings.",
						response: {
							body: {
								status: "warning",
								components: [
									{
										name: "Database",
										status: "warning",
										details: "The database is running slow."
									},
									{
										name: "Storage",
										status: "ok"
									}
								]
							}
						}
					},
					{
						id: "healthResponseError",
						description: "The response for the health request with errors.",
						response: {
							body: {
								status: "error",
								components: [
									{
										name: "Database",
										status: "ok"
									},
									{
										name: "Storage",
										status: "error",
										details: "The storage is full."
									}
								]
							}
						}
					}
				]
			}
		],
		skipAuth: true
	};

	const specRoute: IRestRoute<INoContentRequest, IServerSpecResponse> = {
		operationId: "serverSpec",
		summary: "Get the OpenAPI specification for the endpoints",
		tag: tagsInformation[0].name,
		method: "GET",
		path: `${baseRouteName}/spec`,
		handler: async (httpRequestContext, request) =>
			serverSpec(httpRequestContext, componentName, request),
		responseType: [
			{
				type: nameof<IServerSpecResponse>(),
				examples: [
					{
						id: "specResponse",
						description: "The response for the spec request.",
						response: {
							body: {
								openapi: "3.1.0",
								info: {},
								paths: {}
							}
						}
					}
				]
			}
		],
		skipAuth: true
	};

	return [rootRoute, informationRoute, healthRoute, specRoute];
}

/**
 * Get the information for the server.
 * @param httpRequestContext The request context for the API.
 * @param componentName The name of the component to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function serverInfo(
	httpRequestContext: IHttpRequestContext,
	componentName: string,
	request: INoContentRequest
): Promise<IServerInfoResponse> {
	const component = ComponentFactory.get<IInformationComponent>(componentName);
	return {
		body: await component.info()
	};
}

/**
 * Get the health for the server.
 * @param httpRequestContext The request context for the API.
 * @param componentName The name of the component to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function serverHealth(
	httpRequestContext: IHttpRequestContext,
	componentName: string,
	request: INoContentRequest
): Promise<IServerHealthResponse> {
	const component = ComponentFactory.get<IInformationComponent>(componentName);
	return {
		body: await component.health()
	};
}

/**
 * Get the spec for the server.
 * @param httpRequestContext The request context for the API.
 * @param componentName The name of the component to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function serverSpec(
	httpRequestContext: IHttpRequestContext,
	componentName: string,
	request: INoContentRequest
): Promise<IServerSpecResponse> {
	const component = ComponentFactory.get<IInformationComponent>(componentName);
	const spec = await component.spec();

	if (Is.objectValue(spec)) {
		return {
			body: spec
		};
	}
	return {
		statusCode: HttpStatusCode.notFound
	};
}
