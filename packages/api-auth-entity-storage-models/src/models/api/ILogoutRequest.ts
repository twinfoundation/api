// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Perform a logout on the auth token.
 */
export interface ILogoutRequest {
	/**
	 * The logout token details.
	 */
	query: {
		/**
		 * The token to logout, if it uses a mechanism with public access.
		 */
		token?: string;
	};
}
