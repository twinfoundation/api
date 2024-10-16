// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@twin.org/core";
import type { HttpStatusCode } from "@twin.org/web";

/**
 * The server cannot process the request, see the content for more details.
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
