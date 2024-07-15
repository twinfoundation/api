// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpStatusCode } from "@gtsc/web";

/**
 * The rest request ended in accepted response.
 */
export interface IAcceptedResponse {
	/**
	 * Response status code.
	 */
	statusCode: typeof HttpStatusCode.accepted;

	/**
	 * Additional response headers.
	 */
	headers: {
		/**
		 * The location where the resource was accepted.
		 */
		location: string;
	};
}
