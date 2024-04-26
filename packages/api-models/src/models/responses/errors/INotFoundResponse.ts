// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IErrorResponse } from "../IErrorResponse";

/**
 * The resource you tried to access does not exist, see the error field for more details.
 */
export interface INotFoundResponse extends IErrorResponse {
	/**
	 * The id if the item that was not found.
	 */
	notFoundId?: string;
}
