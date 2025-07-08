// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Configuration for the entity storage authentication admin service.
 */
export interface IEntityStorageAuthenticationAdminServiceConfig {
	/**
	 * The minimum password length.
	 * @default 8
	 */
	minPasswordLength?: number;
}
