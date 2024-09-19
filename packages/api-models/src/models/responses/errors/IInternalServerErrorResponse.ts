// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@twin.org/core";
import type { HttpStatusCode } from "@twin.org/web";

/**
 * The server has encountered a situation it does not know how to handle, see the content for more details.
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
