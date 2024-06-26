// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IRestRoute, ITag } from "@gtsc/api-models";
import { nameof } from "@gtsc/nameof";
import { ServiceFactory, type IRequestContext } from "@gtsc/services";
import type { IServerInfoResponse } from "../models/IServerInfoResponse";
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
	const informationRoute: IRestRoute<void, IServerInfoResponse> = {
		operationId: "serverInformation",
		summary: "Get the information for the server",
		tag: tags[0].name,
		method: "GET",
		path: `${baseRouteName}/`,
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

	return [informationRoute];
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
		body: await service.serverInformation()
	};
}
