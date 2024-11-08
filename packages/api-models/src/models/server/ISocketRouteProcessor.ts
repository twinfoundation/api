// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRouteProcessor } from "./IBaseRouteProcessor";
import type { IHttpRequestIdentity } from "../protocol/IHttpRequestIdentity";
import type { IHttpResponse } from "../protocol/IHttpResponse";
import type { IHttpServerRequest } from "../protocol/IHttpServerRequest";
import type { ISocketRoute } from "../routes/ISocketRoute";

/**
 * The definition for a processor for handling socket routes.
 */
export interface ISocketRouteProcessor extends IBaseRouteProcessor<ISocketRoute> {
	/**
	 * Process the connected event.
	 * @param request The request to handle.
	 * @param route The route being requested, if a matching one was found.
	 * @param processorState The state handed through the processors.
	 * @returns Promise that resolves when the request is processed.
	 */
	connected?(
		request: IHttpServerRequest,
		route: ISocketRoute | undefined,
		processorState: { [id: string]: unknown }
	): Promise<void>;

	/**
	 * Process the disconnected event.
	 * @param request The request to handle.
	 * @param route The route being requested, if a matching one was found.
	 * @param processorState The state handed through the processors.
	 * @returns Promise that resolves when the request is processed.
	 */
	disconnected?(
		request: IHttpServerRequest,
		route: ISocketRoute | undefined,
		processorState: { [id: string]: unknown }
	): Promise<void>;

	/**
	 * Process the REST request for the specified route.
	 * @param request The request to handle.
	 * @param response The response data to send if any.
	 * @param route The route being requested, if a matching one was found.
	 * @param requestIdentity The identity context for the request.
	 * @param processorState The state handed through the processors.
	 * @param responseEmitter The function to emit a response.
	 * @returns Promise that resolves when the request is processed.
	 */
	process?(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: ISocketRoute | undefined,
		requestIdentity: IHttpRequestIdentity,
		processorState: { [id: string]: unknown },
		responseEmitter: (response: IHttpResponse) => Promise<void>
	): Promise<void>;
}
