// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Response from a refresh on the auth token.
 */
export interface IRefreshTokenResponse {
	/**
	 * The refresh token details.
	 */
	body: {
		/**
		 * The refreshed token, if it uses a mechanism with public access.
		 */
		token?: string;

		/**
		 * The expiry time of the token.
		 */
		expiry: number;
	};
}
