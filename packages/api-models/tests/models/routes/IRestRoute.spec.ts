// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@gtsc/nameof";
import type { IHttpRequestContext } from "../../../src/models/protocol/IHttpRequestContext";
import type { IRestRoute } from "../../../src/models/routes/IRestRoute";

/**
 * Create a new item.
 */
interface ICreateRequest {
	/**
	 * The data for the request.
	 */
	data: {
		/**
		 * The value for the request.
		 */
		value: string;
	};
}

/**
 * The rest request ended in created response.
 */
interface ICreateResponse {
	/**
	 * The data for the response.
	 */
	data: {
		/**
		 * The value for the response.
		 */
		value: string;
	};
}

describe("IRestRoute", () => {
	test("Can construct REST Routes", () => {
		const createRoute: IRestRoute<ICreateRequest, ICreateResponse> = {
			operationId: "identityCreate",
			summary: "Create a new identity",
			tag: "Tag",
			method: "POST",
			path: "/",
			handler: async (requestContext, request, body) =>
				identityCreate(requestContext, "serviceName", request, body),
			requestType: {
				type: nameof<ICreateRequest>(),
				examples: [
					{
						id: "example-request",
						description: "Example request",
						body: {
							data: {
								value: "user"
							}
						}
					}
				]
			},
			responseType: [
				{
					type: nameof<ICreateResponse>(),
					examples: [
						{
							id: "example-response",
							description: "Example response",
							body: {
								data: {
									value: "user"
								}
							}
						}
					]
				}
			]
		};

		const routes: IRestRoute[] = [createRoute];

		expect(routes.length).toEqual(1);
	});
});

/**
 * Create a new identity.
 * @param requestContext The request context for the API.
 * @param serviceName The name of the service to use in the routes.
 * @param request The request.
 * @param body The body if required for pure content.
 * @returns The response object with additional http response properties.
 */
export async function identityCreate(
	requestContext: IHttpRequestContext,
	serviceName: string,
	request: ICreateRequest,
	body?: unknown
): Promise<ICreateResponse> {
	return {
		data: {
			value: "foo"
		}
	};
}
