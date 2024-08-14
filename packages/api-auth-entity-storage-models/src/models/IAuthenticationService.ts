// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@gtsc/core";

/**
 * Contract definition for authentication service.
 */
export interface IAuthenticationService extends IComponent {
	/**
	 * Perform a login for the user.
	 * @param email The email address for the user.
	 * @param password The password for the user.
	 * @returns The authentication token for the user, if it uses a mechanism with public access.
	 */
	login(
		email: string,
		password: string
	): Promise<{
		token?: string;
		expiry: number;
	}>;

	/**
	 * Logout the current user.
	 * @param token The token to logout, if it uses a mechanism with public access.
	 * @returns Nothing.
	 */
	logout(token?: string): Promise<void>;

	/**
	 * Refresh the token.
	 * @param token The token to refresh, if it uses a mechanism with public access.
	 * @returns The refreshed token, if it uses a mechanism with public access.
	 */
	refresh(token?: string): Promise<{
		token?: string;
		expiry: number;
	}>;
}
