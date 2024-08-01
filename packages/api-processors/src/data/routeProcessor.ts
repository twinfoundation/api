// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	type IRestRouteResponseOptions,
	ResponseHelper,
	type IHttpRequest,
	type IHttpResponse,
	type IHttpRestRouteProcessor,
	type IHttpServerRequest,
	type IRestRoute
} from "@gtsc/api-models";
import {
	AlreadyExistsError,
	BaseError,
	ConflictError,
	GuardError,
	Is,
	NotFoundError,
	NotImplementedError,
	UnauthorizedError,
	type IError
} from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import { HttpStatusCode } from "@gtsc/web";
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
	 * @param requestContext The context for the request.
	 * @param processorState The state handed through the processors.
	 */
	public async process(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestContext: IServiceRequestContext,
		processorState: { [id: string]: unknown }
	): Promise<void> {
		// Don't handle the route if another processor has already set the response
		// status code e.g. from an auth processor
		if (Is.empty(response.statusCode)) {
			if (Is.empty(route)) {
				ResponseHelper.buildError(
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
							...requestContext,
							serverRequest: request,
							processorState
						},
						req
					);

					let statusCode: HttpStatusCode =
						restRouteResponse.statusCode ?? response.statusCode ?? HttpStatusCode.ok;

					if (Is.empty(restRouteResponse?.body) && statusCode === HttpStatusCode.ok) {
						// If there is no custom status code and the body is empty
						// use the no content response
						statusCode = HttpStatusCode.noContent;
					}

					const headers = restRouteResponse?.headers ?? {};

					// If there are custom response types for the route then use them
					// instead of the default application/json
					headers["Content-Type"] =
						restRouteResponse?.attachment?.mimeType ??
						response.headers?.["Content-Type"] ??
						"application/json; charset=utf-8";

					// If there are filename or inline options set then add the content disposition
					if (
						Is.stringValue(restRouteResponse?.attachment?.filename) ||
						Is.boolean(restRouteResponse?.attachment?.inline)
					) {
						let filename = "";
						if (Is.stringValue(restRouteResponse?.attachment?.filename)) {
							filename = `; filename="${restRouteResponse?.attachment?.filename}"`;
						}
						headers["Content-Disposition"] =
							`${restRouteResponse?.attachment?.inline ? "inline" : "attachment"}${filename}`;
					}

					// If this is a binary response then set the content length
					if (Is.uint8Array(restRouteResponse?.body)) {
						const contentLength = restRouteResponse.body.length;
						headers["Content-Length"] = contentLength.toString();
					}

					response.headers = headers;
					response.statusCode = statusCode;
					response.body = restRouteResponse?.body;
				} catch (err) {
					const { error, httpStatusCode } = this.processError(err);

					ResponseHelper.buildError(response, error, httpStatusCode);
				}
			}
		}
	}

	/**
	 * Process the errors from the routes.
	 * @param err The error to process.
	 * @returns The status code and additional error data.
	 */
	private processError(err: unknown): {
		error: IError;
		httpStatusCode: HttpStatusCode;
	} {
		const error: BaseError = BaseError.fromError(err);

		// If the error or any of its sub errors are of the specific
		// types then set the http response code accordingly
		const flattened = BaseError.flatten(error);

		let httpStatusCode: HttpStatusCode = HttpStatusCode.internalServerError;
		if (flattened.some(e => BaseError.isErrorName(e, GuardError.CLASS_NAME))) {
			httpStatusCode = HttpStatusCode.badRequest;
		} else if (flattened.some(e => BaseError.isErrorName(e, ConflictError.CLASS_NAME))) {
			httpStatusCode = HttpStatusCode.conflict;
		} else if (flattened.some(e => BaseError.isErrorName(e, NotFoundError.CLASS_NAME))) {
			httpStatusCode = HttpStatusCode.notFound;
		} else if (flattened.some(e => BaseError.isErrorName(e, AlreadyExistsError.CLASS_NAME))) {
			httpStatusCode = HttpStatusCode.conflict;
		} else if (flattened.some(e => BaseError.isErrorName(e, UnauthorizedError.CLASS_NAME))) {
			httpStatusCode = HttpStatusCode.unauthorized;
		} else if (flattened.some(e => BaseError.isErrorName(e, NotImplementedError.CLASS_NAME))) {
			httpStatusCode = HttpStatusCode.forbidden;
		}

		const returnError = error.toJsonObject();
		if (!this._includeErrorStack) {
			delete returnError.stack;
		}

		return {
			error: returnError,
			httpStatusCode
		};
	}
}
