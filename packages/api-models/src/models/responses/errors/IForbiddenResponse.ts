// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@gtsc/core";
import type { HttpStatusCode } from "@gtsc/web";

/**
 * The operation that you tried to perform is not possible, see the error field for more details.
 */
export interface IForbiddenResponse {
	/**
	 * Response status code.
	 */
	statusCode: typeof HttpStatusCode.forbidden;

	/**
	 * The body which contains the error.
	 */
	body: IError;
}
