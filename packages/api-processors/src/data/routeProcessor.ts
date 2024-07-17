// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpRestRouteProcessor,
	IHttpRequest,
	IHttpResponse,
	IHttpServerRequest,
	IRestRoute
} from "@gtsc/api-models";
import {
	AlreadyExistsError,
	BaseError,
	ConflictError,
	Is,
	NotFoundError,
	NotImplementedError,
	UnauthorizedError,
	type IError
} from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import { HttpStatusCode } from "@gtsc/web";

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
	 * @param options.includeErrorStack Include the stack with errors.
	 * @returns Promise that resolves when the processor is initialized.
	 */
	constructor(options?: { includeErrorStack?: boolean }) {
		this._includeErrorStack = options?.includeErrorStack ?? false;
	}

	/**
	 * Process the REST request for the specified route.
	 * @param request The incoming request.
	 * @param response The outgoing response.
	 * @param route The route to process.
	 * @param requestContext The context for the request.
	 * @param state The state for the request.
	 */
	public async process(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestContext: IServiceRequestContext,
		state: { [id: string]: unknown }
	): Promise<void> {
		// Don't handle the route if another processor has already set the response
		// status code e.g. from an auth processor
		if (Is.empty(response.statusCode)) {
			if (Is.empty(route)) {
				response.headers ??= {};
				response.headers["Content-Type"] = "application/json; charset=utf-8";
				response.body = {
					name: NotFoundError.CLASS_NAME,
					message: `${this.CLASS_NAME}.routeNotFound`,
					properties: {
						notFoundId: request.url
					}
				};
				response.statusCode = HttpStatusCode.notFound;
			} else {
				try {
					const req: IHttpRequest = {
						pathParams: request.pathParams,
						query: request.query,
						body: request.body
					};

					const restRouteResponse = await route.handler(
						{
							...requestContext,
							serverRequest: request
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
						restRouteResponse?.options?.mimeType ??
						response.headers?.["Content-Type"] ??
						"application/json; charset=utf-8";

					// If there are filename or inline options set then add the content disposition
					if (
						Is.stringValue(restRouteResponse?.options?.filename) ||
						Is.boolean(restRouteResponse?.options?.inline)
					) {
						let filename = "";
						if (Is.stringValue(restRouteResponse?.options?.filename)) {
							filename = `; filename="${restRouteResponse?.options?.filename}"`;
						}
						headers["Content-Disposition"] =
							`${restRouteResponse?.options?.inline ? "inline" : "attachment"}${filename}`;
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

					response.headers ??= {};
					response.headers["Content-Type"] = "application/json; charset=utf-8";
					response.body = error;
					response.statusCode = httpStatusCode;
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

		let httpStatusCode: HttpStatusCode = HttpStatusCode.badRequest;
		if (flattened.some(e => BaseError.isErrorName(e, ConflictError.CLASS_NAME))) {
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

		return {
			error: error.toJsonObject(this._includeErrorStack),
			httpStatusCode
		};
	}
}
