// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IError } from "@gtsc/core";

/**
 * You are not authorized to use the API or no credentials were supplied.
 */
export interface IUnauthorizedResponse {
	/**
	 * The body which contains the error.
	 */
	body: IError;
}
