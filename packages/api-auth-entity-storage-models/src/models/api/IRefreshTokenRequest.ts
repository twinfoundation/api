// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Perform a refresh on the auth token.
 */
export interface IRefreshTokenRequest {
	/**
	 * The refresh token details.
	 */
	query?: {
		/**
		 * The token to refresh, if it uses a mechanism with public access.
		 */
		token?: string;
	};
}
