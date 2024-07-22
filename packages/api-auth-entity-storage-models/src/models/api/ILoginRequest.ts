// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Perform a login on the server.
 */
export interface ILoginRequest {
	/**
	 * The login details.
	 */
	body: {
		/**
		 * The email address for the user.
		 */
		email: string;

		/**
		 * The password for the user.
		 */
		password: string;
	};
}
