// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@gtsc/core";
import type { HttpStatusCode } from "@gtsc/web";

/**
 * The server has encountered a situation it does not know how to handle, see the error field for more details.
 */
export interface IInternalServerErrorResponse {
	/**
	 * Response status code.
	 */
	statusCode: typeof HttpStatusCode.internalServerError;

	/**
	 * The body which contains the error.
	 */
	body: IError;
}
