// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@twin.org/core";
import type { HttpStatusCode } from "@twin.org/web";

/**
 * You are not authorized to use the API or no credentials were supplied, see the content for more details.
 */
export interface IUnauthorizedResponse {
	/**
	 * Response status code.
	 */
	statusCode: typeof HttpStatusCode.unauthorized;

	/**
	 * The body which contains the error.
	 */
	body: IError;
}
