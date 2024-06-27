// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { readFile } from "node:fs/promises";
import type { INoContentResponse, IRestRoute, ITag } from "@gtsc/api-models";
import { Is } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { ServiceFactory, type IRequestContext } from "@gtsc/services";
import { HttpStatusCodes } from "@gtsc/web";
import type { IServerHealthResponse } from "../models/IServerHealthResponse";
import type { IServerInfoResponse } from "../models/IServerInfoResponse";
import type { IServerSpecResponse } from "../models/IServerSpecResponse";
import type { InformationService } from "../services/informationService";

/**
 * The tag to associate with the routes.
 */
export const tags: ITag[] = [
	{
		name: "Info",
		description: "Information endpoints for the REST server."
	}
];

/**
 * The REST routes for server information.
 * @param baseRouteName Prefix to prepend to the paths.
 * @param factoryServiceName The name of the service to use in the routes store in the ServiceFactory.
 * @returns The generated routes.
 */
export function generateRestRoutes(
	baseRouteName: string,
	factoryServiceName: string
): IRestRoute[] {
	const rootRoute: IRestRoute<void, unknown> = {
		operationId: "serverRoot",
		summary: "Get the root blank page",
		tag: tags[0].name,
		method: "GET",
		path: `${baseRouteName}/`,
		handler: async () => ({}),
		responseType: [
			{
				type: nameof<INoContentResponse>()
			}
		],
		excludeFromSpec: true
	};

	const informationRoute: IRestRoute<void, IServerInfoResponse> = {
		operationId: "serverInformation",
		summary: "Get the information for the server",
		tag: tags[0].name,
		method: "GET",
		path: `${baseRouteName}/info`,
		handler: async (requestContext, request) =>
			serverInformation(requestContext, factoryServiceName, request),
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
		]
	};

	const healthRoute: IRestRoute<void, IServerHealthResponse> = {
		operationId: "serverHealth",
		summary: "Get the health for the server",
		tag: tags[0].name,
		method: "GET",
		path: `${baseRouteName}/health`,
		handler: async (requestContext, request) =>
			serverHealth(requestContext, factoryServiceName, request),
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
		]
	};

	const specRoute: IRestRoute<void, IServerSpecResponse> = {
		operationId: "serverSpec",
		summary: "Get the OpenAPI specification for the endpoints",
		tag: tags[0].name,
		method: "GET",
		path: `${baseRouteName}/spec`,
		handler: async (requestContext, request) =>
			serverSpec(requestContext, factoryServiceName, request),
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
		]
	};

	return [rootRoute, informationRoute, healthRoute, specRoute];
}

/**
 * Get the information for the server.
 * @param requestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function serverInformation(
	requestContext: IRequestContext,
	factoryServiceName: string,
	request: unknown
): Promise<IServerInfoResponse> {
	const service = ServiceFactory.get<InformationService>(factoryServiceName);
	return {
		body: service.serverInformation()
	};
}

/**
 * Get the health for the server.
 * @param requestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function serverHealth(
	requestContext: IRequestContext,
	factoryServiceName: string,
	request: unknown
): Promise<IServerHealthResponse> {
	const service = ServiceFactory.get<InformationService>(factoryServiceName);
	return {
		body: service.serverHealth()
	};
}

/**
 * Get the spec for the server.
 * @param requestContext The request context for the API.
 * @param factoryServiceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function serverSpec(
	requestContext: IRequestContext,
	factoryServiceName: string,
	request: unknown
): Promise<IServerSpecResponse> {
	const service = ServiceFactory.get<InformationService>(factoryServiceName);
	const filename = service.openApiSpecPath();
	let content;

	if (Is.stringValue(filename)) {
		const contentBuffer = await readFile(filename, "utf8");
		content = JSON.parse(contentBuffer);
		return {
			body: content
		};
	}
	return {
		statusCode: HttpStatusCodes.NOT_FOUND
	};
}
