// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Configuration for the authentication header processor
 */
export interface IAuthHeaderProcessorConfig {
	/**
	 * The name of the key to retrieve from the vault for signing JWT.
	 * @default auth-signing
	 */
	signingKeyName?: string;

	/**
	 * The name of the cookie to use for the token.
	 * @default access_token
	 */
	cookieName?: string;
}
