// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@gtsc/core";
import type { HttpStatusCode } from "@gtsc/web";

/**
 * The request resulted in a conflicting operation, see the error field for more details.
 */
export interface IConflictResponse {
	/**
	 * Response status code.
	 */
	statusCode: typeof HttpStatusCode.conflict;

	/**
	 * The body which contains the error.
	 */
	body: IError & {
		/**
		 * The conflicting items.
		 */
		conflicts: string[];
	};
}
