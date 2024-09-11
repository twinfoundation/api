// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	HttpErrorHelper,
	type IHttpRequest,
	type IHttpRequestIdentity,
	type IHttpResponse,
	type IHttpRestRouteProcessor,
	type IHttpServerRequest,
	type IRestRoute,
	type IRestRouteResponseOptions
} from "@gtsc/api-models";
import { Is, NotFoundError } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { HeaderTypes, HttpStatusCode, MimeTypes } from "@gtsc/web";
import type { IRouteProcessorConfig } from "../models/IRouteProcessorConfig";

/**
 * Process the REST request and hands it on to the route handler.
 */
export class RouteProcessor implements IHttpRestRouteProcessor {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<RouteProcessor>();

	/**
	 * Include the stack with errors.
	 * @internal
	 */
	private readonly _includeErrorStack: boolean;

	/**
	 * Create a new instance of RouteProcessor.
	 * @param options Options for the processor.
	 * @param options.config The configuration for the processor.
	 * @returns Promise that resolves when the processor is initialized.
	 */
	constructor(options?: { config?: IRouteProcessorConfig }) {
		this._includeErrorStack = options?.config?.includeErrorStack ?? false;
	}

	/**
	 * Process the REST request for the specified route.
	 * @param request The incoming request.
	 * @param response The outgoing response.
	 * @param route The route to process.
	 * @param requestIdentity The identity context for the request.
	 * @param processorState The state handed through the processors.
	 */
	public async process(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestIdentity: IHttpRequestIdentity,
		processorState: { [id: string]: unknown }
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

					const restRouteResponse: IHttpResponse & IRestRouteResponseOptions = await route.handler(
						{
							...requestIdentity,
							serverRequest: request,
							processorState
						},
						req
					);

					let statusCode: HttpStatusCode =
						restRouteResponse.statusCode ?? response.statusCode ?? HttpStatusCode.ok;

					const headers = restRouteResponse?.headers ?? {};

					if (Is.empty(restRouteResponse?.body)) {
						// If there is no custom status code and the body is empty
						// use the no content response and set the length to 0
						headers[HeaderTypes.ContentLength] = "0";
						// Only change to no content if the status code is ok
						// This could be something like a created status code
						// which is successful but has no content
						if (statusCode === HttpStatusCode.ok) {
							statusCode = HttpStatusCode.noContent;
						}
					} else {
						// Only set the content type if there is a body
						// If there are custom response types for the route then use them
						// instead of the default application/json
						headers[HeaderTypes.ContentType] =
							restRouteResponse?.attachment?.mimeType ??
							response.headers?.[HeaderTypes.ContentType] ??
							`${MimeTypes.Json}; charset=utf-8`;

						// If there are filename or inline options set then add the content disposition
						if (
							Is.stringValue(restRouteResponse?.attachment?.filename) ||
							Is.boolean(restRouteResponse?.attachment?.inline)
						) {
							let filename = "";
							if (Is.stringValue(restRouteResponse?.attachment?.filename)) {
								filename = `; filename="${restRouteResponse?.attachment?.filename}"`;
							}
							headers[HeaderTypes.ContentDisposition] =
								`${restRouteResponse?.attachment?.inline ? "inline" : "attachment"}${filename}`;
						}

						// If this is a binary response then set the content length
						if (Is.uint8Array(restRouteResponse?.body)) {
							const contentLength = restRouteResponse.body.length;
							headers[HeaderTypes.ContentLength] = contentLength.toString();
						}

						response.body = restRouteResponse?.body;
					}

					response.headers = headers;
					response.statusCode = statusCode;
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
