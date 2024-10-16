// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Configuration for the entity storage authentication service.
 */
export interface IEntityStorageAuthenticationServiceConfig {
	/**
	 * The name of the key to retrieve from the vault for signing JWT.
	 * @default auth-signing
	 */
	signingKeyName?: string;

	/**
	 * The default time to live for the JWT.
	 * @default 1440
	 */
	defaultTtlMinutes?: number;
}
