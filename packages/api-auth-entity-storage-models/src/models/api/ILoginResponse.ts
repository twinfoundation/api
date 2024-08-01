// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Response from a login on the server.
 */
export interface ILoginResponse {
	/**
	 * The login response details.
	 */
	body: {
		/**
		 * The access token, if it uses a mechanism with public access.
		 */
		token?: string;

		/**
		 * The expiry time of the token.
		 */
		expiry: number;
	};
}
