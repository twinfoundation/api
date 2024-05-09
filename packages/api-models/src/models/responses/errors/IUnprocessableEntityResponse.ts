// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IErrorResponse } from "./IErrorResponse";

/**
 * The operation could not be processed, see the error field for more details.
 */
export interface IUnprocessableEntityResponse extends IErrorResponse {
	/**
	 * The id which caused the unprocessable entity response.
	 */
	existingId?: string;
}
