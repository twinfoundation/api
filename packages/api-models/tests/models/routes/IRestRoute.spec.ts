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
	body?: {
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
	body?: {
		/**
		 * The value for the response.
		 */
		value: string;
	};
}

describe("IRestRoute", () => {
	test("Can construct REST Routes", () => {
		const createRoute: IRestRoute = {
			operationId: "identityCreate",
			summary: "Create a new identity",
			tag: "Tag",
			method: "POST",
			path: "/",
			handler: async (requestContext, request) =>
				identityCreate(requestContext, "serviceName", request),
			requestType: {
				type: nameof<ICreateRequest>(),
				examples: [
					{
						id: "example-request",
						description: "Example request",
						request: {
							body: {
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
							response: {
								body: {
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
 * @returns The response object with additional http response properties.
 */
export async function identityCreate(
	requestContext: IHttpRequestContext,
	serviceName: string,
	request: ICreateRequest
): Promise<ICreateResponse> {
	return {
		body: {
			value: "foo"
		}
	};
}
