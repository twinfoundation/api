// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";

/**
 * Contract definition for authentication component.
 */
export interface IAuthenticationComponent extends IComponent {
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

	/**
	 * Update the user's password.
	 * @param email The email address of the user to update.
	 * @param currentPassword The current password for the user.
	 * @param newPassword The new password for the user.
	 * @returns Nothing.
	 */
	updatePassword(email: string, currentPassword: string, newPassword: string): Promise<void>;
}
