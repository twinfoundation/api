// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";

/**
 * Contract definition for authentication admin component.
 */
export interface IAuthenticationAdminComponent extends IComponent {
	/**
	 * Create a login for the user.
	 * @param email The email address for the user.
	 * @param password The password for the user.
	 * @param identity The DID to associate with the account.
	 * @returns Nothing.
	 */
	create(email: string, password: string, identity: string): Promise<void>;

	/**
	 * Remove the current user.
	 * @param email The email address of the user to remove.
	 * @returns Nothing.
	 */
	remove(email: string): Promise<void>;

	/**
	 * Update the user's password.
	 * @param email The email address of the user to update.
	 * @param newPassword The new password for the user.
	 * @param currentPassword The current password, optional, if supplied will check against existing.
	 * @returns Nothing.
	 */
	updatePassword(email: string, newPassword: string, currentPassword?: string): Promise<void>;
}
