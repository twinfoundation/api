// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The rest request ended in accepted response.
 */
export interface IAcceptedResponse {
	/**
	 * Alternative response status code.
	 */
	statusCode: number;

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
