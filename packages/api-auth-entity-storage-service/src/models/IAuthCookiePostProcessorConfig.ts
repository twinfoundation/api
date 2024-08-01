// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Configuration for the authentication cookie post processor
 */
export interface IAuthCookiePreProcessorConfig {
	/**
	 * The name of the cookie to use for the token.
	 * @default access_token
	 */
	cookieName?: string;
}
