// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@twin.org/core";
import type { HttpStatusCode } from "@twin.org/web";

/**
 * The operation that you tried to perform is not possible, see the content for more details.
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
