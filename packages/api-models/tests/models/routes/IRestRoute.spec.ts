// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { nameof } from "@gtsc/nameof";
import type { IHttpRequestContext } from "../../../src/models/protocol/IHttpRequestContext";
import type { IRestRoute } from "../../../src/models/routes/IRestRoute";

/**
 * Create a new item.
 */
interface ITestRequest {
	/**
	 * The data for the request.
	 */
	body: {
		/**
		 * The value for the request.
		 */
		value: string;
	};
}

/**
 * The rest request ended in created response.
 */
interface ITestResponse {
	/**
	 * The data for the response.
	 */
	body: {
		/**
		 * The value for the response.
		 */
		value: string;
	};
}

describe("IRestRoute", () => {
	test("Can construct REST Routes", () => {
		const createRoute: IRestRoute<ITestRequest, ITestResponse> = {
			operationId: "testRequestResponse",
			summary: "Perform a request response",
			tag: "Tag",
			method: "POST",
			path: "/",
			handler: async (httpRequestContext, request) =>
				testRequestResponse(httpRequestContext, "serviceName", request),
			requestType: {
				type: nameof<ITestRequest>(),
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
					type: nameof<ITestResponse>(),
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
 * Test request response method.
 * @param httpRequestContext The request context for the API.
 * @param serviceName The name of the service to use in the routes.
 * @param request The request.
 * @returns The response object with additional http response properties.
 */
export async function testRequestResponse(
	httpRequestContext: IHttpRequestContext,
	serviceName: string,
	request: ITestRequest
): Promise<ITestResponse> {
	return {
		body: {
			value: "foo"
		}
	};
}
