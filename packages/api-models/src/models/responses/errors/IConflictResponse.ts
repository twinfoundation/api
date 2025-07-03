// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@twin.org/core";
import type { HttpStatusCode } from "@twin.org/web";

/**
 * The request resulted in a conflicting operation, see the content for more details.
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
