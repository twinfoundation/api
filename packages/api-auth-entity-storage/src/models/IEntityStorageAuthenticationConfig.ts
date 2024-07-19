// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Configuration for the entity storage authentication connector.
 */
export interface IEntityStorageAuthenticationConfig {
	/**
	 * The name of the key to retrieve from the vault for signing JWT.
	 * @default auth-signing
	 */
	signingKeyName?: string;

	/**
	 * The name of the key to retrieve from the vault for encrypting passwords.
	 * @default auth-encryption
	 */
	encryptionKeyName?: string;
}
