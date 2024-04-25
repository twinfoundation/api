// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IRequestContext, IService } from "@gtsc/services";
import type { IHttpRequestHeaders } from "@gtsc/web";
import type { IHttpRequestQuery } from "../protocol/IHttpRequestQuery";
import type { IHttpResponse } from "../protocol/IHttpResponse";
import type { IBaseRoute } from "../routes/IBaseRoute";

/**
 * Definition for a connector which can handle authorisation in the REST pipeline.
 */
export interface IAuthConnector extends IService {
	/**
	 * Process the request to check if the tenant has access to the API.
	 * @param requestContext The context for the request.
	 * @param route The route being requested.
	 * @param headers The request headers.
	 * @param query The request query params.
	 * @returns Nothing.
	 */
	request?(
		requestContext: IRequestContext,
		route: IBaseRoute,
		headers: IHttpRequestHeaders,
		query: IHttpRequestQuery
	): Promise<void>;

	/**
	 * Process the response to see if there are any additional headers to add.
	 * @param requestContext The context for the request.
	 * @param route The route being responded to.
	 * @param requestHeaders The request headers.
	 * @param response The response.
	 * @returns Nothing.
	 */
	response?(
		requestContext: IRequestContext,
		route: IBaseRoute,
		requestHeaders: IHttpRequestHeaders,
		response: { [id: string]: unknown } & IHttpResponse
	): Promise<void>;
}
