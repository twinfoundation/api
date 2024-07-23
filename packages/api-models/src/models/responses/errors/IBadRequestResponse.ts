// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@gtsc/core";
import type { HttpStatusCode } from "@gtsc/web";

/**
 * Something went wrong with the request see the error field for more details.
 */
export interface IBadRequestResponse {
	/**
	 * Response status code.
	 */
	statusCode: typeof HttpStatusCode.badRequest;

	/**
	 * The body which contains the error.
	 */
	body: IError;
}
