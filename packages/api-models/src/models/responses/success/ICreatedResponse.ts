// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HeaderTypes, HttpStatusCode } from "@twin.org/web";

/**
 * The rest request ended in created response.
 */
export interface ICreatedResponse {
	/**
	 * Response status code.
	 */
	statusCode: typeof HttpStatusCode.created;

	/**
	 * Additional response headers.
	 */
	headers: {
		/**
		 * The location where the resource was created.
		 */
		[HeaderTypes.Location]: string;
	};
}
