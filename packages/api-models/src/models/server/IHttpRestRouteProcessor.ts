// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IService, IServiceRequestContext } from "@gtsc/services";
import type { IHttpResponse } from "../protocol/IHttpResponse";
import type { IHttpServerRequest } from "../protocol/IHttpServerRequest";
import type { IRestRoute } from "../routes/IRestRoute";

/**
 * The definition for a processor for handling REST routes.
 */
export interface IHttpRestRouteProcessor extends IService {
	/**
	 * Pre process the REST request for the specified route.
	 * @param request The request to handle.
	 * @param response The response data to send if any.
	 * @param route The route being requested, if a matching one was found.
	 * @param requestContext The context for the request.
	 * @param processorState The state handed through the processors.
	 * @returns Promise that resolves when the request is processed.
	 */
	pre?(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestContext: IServiceRequestContext,
		processorState: { [id: string]: unknown }
	): Promise<void>;

	/**
	 * Process the REST request for the specified route.
	 * @param request The request to handle.
	 * @param response The response data to send if any.
	 * @param route The route being requested, if a matching one was found.
	 * @param requestContext The context for the request.
	 * @param processorState The state handed through the processors.
	 * @returns Promise that resolves when the request is processed.
	 */
	process?(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestContext: IServiceRequestContext,
		processorState: { [id: string]: unknown }
	): Promise<void>;

	/**
	 * Post process the REST request for the specified route.
	 * @param request The request to handle.
	 * @param response The response data to send if any.
	 * @param route The route being requested, if a matching one was found.
	 * @param requestContext The context for the request.
	 * @param processorState The state handed through the processors.
	 * @returns Promise that resolves when the request is processed.
	 */
	post?(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestContext: IServiceRequestContext,
		processorState: { [id: string]: unknown }
	): Promise<void>;
}
