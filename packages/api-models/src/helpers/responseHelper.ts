// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@gtsc/core";
import type { HttpStatusCode } from "@gtsc/web";
import type { IHttpResponse } from "../models/protocol/IHttpResponse";

/**
 * Helper class for building responses.
 */
export class ResponseHelper {
	/**
	 * Build an error response.
	 * @param response The response to build the error into.
	 * @param error The error to build the response for.
	 * @param statusCode The status code to use for the error.
	 */
	public static buildError(
		response: IHttpResponse,
		error: IError,
		statusCode: HttpStatusCode
	): void {
		response.headers ??= {};
		response.headers["Content-Type"] = "application/json; charset=utf-8";
		response.body = error;
		response.statusCode = statusCode;
	}
}
