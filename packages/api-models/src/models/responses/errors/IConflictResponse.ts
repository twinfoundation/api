// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IErrorResponse } from "../IErrorResponse";

/**
 * The request resulted in a conflicting operation, see the error field for more details.
 */
export interface IConflictResponse extends IErrorResponse {
	/**
	 * The conflicting items.
	 */
	conflicts: string[];
}
