// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRouteProcessor } from "./IBaseRouteProcessor";
import type { IHttpRequestIdentity } from "../protocol/IHttpRequestIdentity";
import type { IHttpResponse } from "../protocol/IHttpResponse";
import type { IHttpServerRequest } from "../protocol/IHttpServerRequest";
import type { IRestRoute } from "../routes/IRestRoute";

/**
 * The definition for a processor for handling REST routes.
 */
export interface IRestRouteProcessor extends IBaseRouteProcessor<IRestRoute> {
	/**
	 * Process the REST request for the specified route.
	 * @param request The request to handle.
	 * @param response The response data to send if any.
	 * @param route The route being requested, if a matching one was found.
	 * @param requestIdentity The identity context for the request.
	 * @param processorState The state handed through the processors.
	 * @returns Promise that resolves when the request is processed.
	 */
	process?(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestIdentity: IHttpRequestIdentity,
		processorState: { [id: string]: unknown }
	): Promise<void>;
}
