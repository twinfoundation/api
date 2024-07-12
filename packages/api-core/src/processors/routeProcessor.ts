// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	HttpRestRouteProcessor,
	IHttpRequest,
	IHttpResponse,
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
import type { IServiceRequestContext } from "@gtsc/services";
import { HttpStatusCodes } from "@gtsc/web";

/**
 * Process the REST request and hands it on to the route handler.
 * @param requestContext The context for the request.
 * @param request The incoming request.
 * @param response The outgoing response.
 * @param route The route to process.
 * @param state The state for the request.
 * @param options Additional options for the processing.
 * @param options.includeErrorStack Include the error stack when logging errors.
 */
export const routeProcessor: HttpRestRouteProcessor<
	{ includeErrorStack?: boolean } | undefined
> = async (
	requestContext: IServiceRequestContext,
	request: IHttpRequest,
	response: IHttpResponse,
	route: IRestRoute | undefined,
	state: { [id: string]: unknown },
	options?: { includeErrorStack?: boolean }
) => {
	// Don't handle the route if another processor has already set the response
	// status code e.g. from an auth processor
	if (Is.empty(response.statusCode)) {
		if (Is.empty(route)) {
			response.headers ??= {};
			response.headers["Content-Type"] = "application/json; charset=utf-8";
			response.body = {
				name: NotFoundError.CLASS_NAME,
				message: "restRouteHandler.routeNotFound",
				properties: {
					notFoundId: request.url
				}
			};
			response.statusCode = HttpStatusCodes.NOT_FOUND;
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
						rawRequest: request
					},
					req
				);

				let statusCode: HttpStatusCodes =
					restRouteResponse.statusCode ?? response.statusCode ?? HttpStatusCodes.OK;

				if (Is.empty(restRouteResponse?.body) && statusCode === HttpStatusCodes.OK) {
					// If there is no custom status code and the body is empty
					// use the no content response
					statusCode = HttpStatusCodes.NO_CONTENT;
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
				const { error, httpStatusCode } = processError(err, options?.includeErrorStack);

				response.headers ??= {};
				response.headers["Content-Type"] = "application/json; charset=utf-8";
				response.body = error;
				response.statusCode = httpStatusCode;
			}
		}
	}
};

/**
 * Process the errors from the routes.
 * @param err The error to process.
 * @param includeStack Include the stack details in errors.
 * @returns The status code and additional error data.
 */
function processError(
	err: unknown,
	includeStack?: boolean
): {
	error: IError;
	httpStatusCode: number;
} {
	const error: BaseError = BaseError.fromError(err);

	// If the error or any of its sub errors are of the specific
	// types then set the http response code accordingly
	const flattened = BaseError.flatten(error);

	let httpStatusCode = HttpStatusCodes.BAD_REQUEST;
	if (flattened.some(e => BaseError.isErrorName(e, ConflictError.CLASS_NAME))) {
		httpStatusCode = HttpStatusCodes.CONFLICT;
	} else if (flattened.some(e => BaseError.isErrorName(e, NotFoundError.CLASS_NAME))) {
		httpStatusCode = HttpStatusCodes.NOT_FOUND;
	} else if (flattened.some(e => BaseError.isErrorName(e, AlreadyExistsError.CLASS_NAME))) {
		httpStatusCode = HttpStatusCodes.UNPROCESSABLE_ENTITY;
	} else if (flattened.some(e => BaseError.isErrorName(e, UnauthorizedError.CLASS_NAME))) {
		httpStatusCode = HttpStatusCodes.UNAUTHORIZED;
	} else if (flattened.some(e => BaseError.isErrorName(e, NotImplementedError.CLASS_NAME))) {
		httpStatusCode = HttpStatusCodes.FORBIDDEN;
	}

	return {
		error: error.toJsonObject(includeStack),
		httpStatusCode
	};
}
