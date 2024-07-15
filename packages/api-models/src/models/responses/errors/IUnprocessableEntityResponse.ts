// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@gtsc/core";
import type { HttpStatusCode } from "@gtsc/web";

/**
 * The operation could not be processed, see the error field for more details.
 */
export interface IUnprocessableEntityResponse {
	/**
	 * Response status code.
	 */
	statusCode: typeof HttpStatusCode.unprocessableEntity;

	/**
	 * The body which contains the error.
	 */
	body: IError & {
		/**
		 * The id which caused the unprocessable entity response.
		 */
		existingId?: string;
	};
}
