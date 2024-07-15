// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpStatusCode } from "@gtsc/web";

/**
 * The rest request ended in created response.
 */
export interface ICreatedResponse {
	/**
	 * Response status code.
	 */
	statusCode: HttpStatusCode;

	/**
	 * Additional response headers.
	 */
	headers: {
		/**
		 * The location where the resource was created.
		 */
		location: string;
	};
}
