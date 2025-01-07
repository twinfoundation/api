// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	HttpErrorHelper,
	type IHttpRequest,
	type IHttpRequestIdentity,
	type IHttpResponse,
	type IHttpServerRequest,
	type ISocketRoute,
	type ISocketRouteProcessor
} from "@twin.org/api-models";
import { Is, NotFoundError } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { HttpStatusCode } from "@twin.org/web";
import type { ISocketRouteProcessorConstructorOptions } from "../models/ISocketRouteProcessorConstructorOptions";

/**
 * Process the socket request and hands it on to the route handler.
 */
export class SocketRouteProcessor implements ISocketRouteProcessor {
	/**
	 * The namespace supported by the processor.
	 */
	public static readonly NAMESPACE: string = "socket-route";

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<SocketRouteProcessor>();

	/**
	 * Include the stack with errors.
	 * @internal
	 */
	private readonly _includeErrorStack: boolean;

	/**
	 * Create a new instance of SocketRouteProcessor.
	 * @param options Options for the processor.
	 */
	constructor(options?: ISocketRouteProcessorConstructorOptions) {
		this._includeErrorStack = options?.config?.includeErrorStack ?? false;
	}

	/**
	 * Process the REST request for the specified route.
	 * @param request The incoming request.
	 * @param response The outgoing response.
	 * @param route The route to process.
	 * @param requestIdentity The identity context for the request.
	 * @param processorState The state handed through the processors.
	 * @param responseEmitter The function to emit a response.
	 */
	public async process(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: ISocketRoute | undefined,
		requestIdentity: IHttpRequestIdentity,
		processorState: { [id: string]: unknown },
		responseEmitter: (topic: string, response: IHttpResponse) => Promise<void>
	): Promise<void> {
		// Don't handle the route if another processor has already set the response
		// status code e.g. from an auth processor
		if (Is.empty(response.statusCode)) {
			if (Is.empty(route)) {
				HttpErrorHelper.buildResponse(
					response,
					{
						name: NotFoundError.CLASS_NAME,
						message: `${this.CLASS_NAME}.routeNotFound`,
						properties: {
							notFoundId: request.url
						}
					},
					HttpStatusCode.notFound
				);
			} else {
				try {
					const req: IHttpRequest = {
						pathParams: request.pathParams,
						query: request.query,
						body: request.body
					};

					await route.handler(
						{
							...requestIdentity,
							serverRequest: request,
							processorState
						},
						req,
						async (topic, restRouteResponse) => {
							response.headers = restRouteResponse?.headers;
							response.body = restRouteResponse?.body;
							response.statusCode =
								restRouteResponse.statusCode ?? response.statusCode ?? HttpStatusCode.ok;
							await responseEmitter(topic, response);
						}
					);
				} catch (err) {
					const { error, httpStatusCode } = HttpErrorHelper.processError(
						err,
						this._includeErrorStack
					);

					HttpErrorHelper.buildResponse(response, error, httpStatusCode);
				}
			}
		}
	}
}
