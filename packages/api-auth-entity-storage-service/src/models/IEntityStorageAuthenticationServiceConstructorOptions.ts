// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IEntityStorageAuthenticationServiceConfig } from "./IEntityStorageAuthenticationServiceConfig";

/**
 * Options for the EntityStorageAuthenticationService constructor.
 */
export interface IEntityStorageAuthenticationServiceConstructorOptions {
	/**
	 * The entity storage for the users.
	 * @default authentication-user
	 */
	userEntityStorageType?: string;

	/**
	 * The vault for the private keys.
	 * @default vault
	 */
	vaultConnectorType?: string;

	/**
	 * The admin service.
	 * @default authentication-admin
	 */
	authenticationAdminServiceType?: string;

	/**
	 * The configuration for the authentication.
	 */
	config?: IEntityStorageAuthenticationServiceConfig;
}
