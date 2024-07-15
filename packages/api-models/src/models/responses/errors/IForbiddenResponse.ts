// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@gtsc/core";

/**
 * The operation that you tried to perform is not possible, see the error field for more details.
 */
export interface IForbiddenResponse {
	/**
	 * The body which contains the error.
	 */
	body: IError;
}
