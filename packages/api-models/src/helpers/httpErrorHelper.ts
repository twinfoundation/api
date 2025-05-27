// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	AlreadyExistsError,
	BaseError,
	ConflictError,
	GuardError,
	type IError,
	NotFoundError,
	NotImplementedError,
	UnauthorizedError,
	UnprocessableError,
	ValidationError
} from "@twin.org/core";
import { HeaderTypes, HttpStatusCode, MimeTypes } from "@twin.org/web";
import type { IHttpResponse } from "../models/protocol/IHttpResponse";

/**
 * Class to help with processing http errors.
 */
export class HttpErrorHelper {
	/**
	 * Process the errors from the routes.
	 * @param err The error to process.
	 * @param includeStack Should the stack be included in the error.
	 * @returns The status code and additional error data.
	 */
	public static processError(
		err: unknown,
		includeStack?: boolean
	): {
		error: IError;
		httpStatusCode: HttpStatusCode;
	} {
		const error: BaseError = BaseError.fromError(err);

		// If the error or any of its sub errors are of the specific
		// types then set the http response code accordingly
		const flattened = BaseError.flatten(error);

		let httpStatusCode: HttpStatusCode = HttpStatusCode.internalServerError;
		if (
			flattened.some(e => BaseError.isErrorName(e, GuardError.CLASS_NAME)) ||
			flattened.some(e => BaseError.isErrorName(e, ValidationError.CLASS_NAME))
		) {
			httpStatusCode = HttpStatusCode.badRequest;
		} else if (
			flattened.some(e => BaseError.isErrorName(e, ConflictError.CLASS_NAME)) ||
			flattened.some(e => BaseError.isErrorName(e, AlreadyExistsError.CLASS_NAME))
		) {
			httpStatusCode = HttpStatusCode.conflict;
		} else if (flattened.some(e => BaseError.isErrorName(e, NotFoundError.CLASS_NAME))) {
			httpStatusCode = HttpStatusCode.notFound;
		} else if (flattened.some(e => BaseError.isErrorName(e, UnauthorizedError.CLASS_NAME))) {
			httpStatusCode = HttpStatusCode.unauthorized;
		} else if (flattened.some(e => BaseError.isErrorName(e, NotImplementedError.CLASS_NAME))) {
			httpStatusCode = HttpStatusCode.forbidden;
		} else if (flattened.some(e => BaseError.isErrorName(e, UnprocessableError.CLASS_NAME))) {
			httpStatusCode = HttpStatusCode.unprocessableEntity;
		}

		const returnError = error.toJsonObject();
		if (!includeStack) {
			delete returnError.stack;
		}

		return {
			error: returnError,
			httpStatusCode
		};
	}

	/**
	 * Build an error response.
	 * @param response The response to build the error into.
	 * @param error The error to build the response for.
	 * @param statusCode The status code to use for the error.
	 */
	public static buildResponse(
		response: IHttpResponse,
		error: IError,
		statusCode: HttpStatusCode
	): void {
		response.headers ??= {};
		response.headers[HeaderTypes.ContentType] = `${MimeTypes.Json}; charset=utf-8`;
		response.body = error;
		response.statusCode = statusCode;
	}
}
