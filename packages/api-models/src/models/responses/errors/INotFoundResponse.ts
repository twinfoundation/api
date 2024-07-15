// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@gtsc/core";

/**
 * The resource you tried to access does not exist, see the error field for more details.
 */
export interface INotFoundResponse {
	/**
	 * The body which contains the error.
	 */
	body: IError & {
		/**
		 * The id if the item that was not found.
		 */
		notFoundId?: string;
	};
}
