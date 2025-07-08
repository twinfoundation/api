// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuthenticationAdminComponent } from "@twin.org/api-auth-entity-storage-models";
import { Converter, GeneralError, Guards, Is, NotFoundError, RandomHelper } from "@twin.org/core";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@twin.org/entity-storage-models";
import { nameof } from "@twin.org/nameof";
import type { AuthenticationUser } from "../entities/authenticationUser";
import type { IEntityStorageAuthenticationAdminServiceConstructorOptions } from "../models/IEntityStorageAuthenticationAdminServiceConstructorOptions";
import { PasswordHelper } from "../utils/passwordHelper";

/**
 * Implementation of the authentication component using entity storage.
 */
export class EntityStorageAuthenticationAdminService implements IAuthenticationAdminComponent {
	/**
	 * The namespace supported by the authentication service.
	 */
	public static readonly NAMESPACE: string = "authentication-admin-entity-storage";

	/**
	 * The minimum password length.
	 * @internal
	 */
	private static readonly _DEFAULT_MIN_PASSWORD_LENGTH: number = 8;

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<EntityStorageAuthenticationAdminService>();

	/**
	 * The entity storage for users.
	 * @internal
	 */
	private readonly _userEntityStorage: IEntityStorageConnector<AuthenticationUser>;

	/**
	 * The minimum password length.
	 * @internal
	 */
	private readonly _minPasswordLength: number;

	/**
	 * Create a new instance of EntityStorageAuthentication.
	 * @param options The dependencies for the identity connector.
	 */
	constructor(options?: IEntityStorageAuthenticationAdminServiceConstructorOptions) {
		this._userEntityStorage = EntityStorageConnectorFactory.get(
			options?.userEntityStorageType ?? "authentication-user"
		);

		this._minPasswordLength =
			options?.config?.minPasswordLength ??
			EntityStorageAuthenticationAdminService._DEFAULT_MIN_PASSWORD_LENGTH;
	}

	/**
	 * Create a login for the user.
	 * @param email The email address for the user.
	 * @param password The password for the user.
	 * @param identity The DID to associate with the account.
	 * @returns Nothing.
	 */
	public async create(email: string, password: string, identity: string): Promise<void> {
		Guards.stringValue(this.CLASS_NAME, nameof(email), email);
		Guards.stringValue(this.CLASS_NAME, nameof(password), password);

		try {
			if (password.length < this._minPasswordLength) {
				throw new GeneralError(this.CLASS_NAME, "passwordTooShort", {
					minLength: this._minPasswordLength
				});
			}

			const user = await this._userEntityStorage.get(email);
			if (user) {
				throw new GeneralError(this.CLASS_NAME, "userExists");
			}

			const saltBytes = RandomHelper.generate(16);
			const passwordBytes = Converter.utf8ToBytes(password);

			const hashedPassword = await PasswordHelper.hashPassword(passwordBytes, saltBytes);

			const newUser: AuthenticationUser = {
				email,
				salt: Converter.bytesToBase64(saltBytes),
				password: hashedPassword,
				identity
			};

			await this._userEntityStorage.set(newUser);
		} catch (error) {
			throw new GeneralError(this.CLASS_NAME, "createUserFailed", undefined, error);
		}
	}

	/**
	 * Remove the current user.
	 * @param email The email address of the user to remove.
	 * @returns Nothing.
	 */
	public async remove(email: string): Promise<void> {
		Guards.stringValue(this.CLASS_NAME, nameof(email), email);

		try {
			const user = await this._userEntityStorage.get(email);
			if (!user) {
				throw new NotFoundError(this.CLASS_NAME, "userNotFound", email);
			}

			await this._userEntityStorage.remove(email);
		} catch (error) {
			throw new GeneralError(this.CLASS_NAME, "removeUserFailed", undefined, error);
		}
	}

	/**
	 * Update the user's password.
	 * @param email The email address of the user to update.
	 * @param newPassword The new password for the user.
	 * @param currentPassword The current password, optional, if supplied will check against existing.
	 * @returns Nothing.
	 */
	public async updatePassword(
		email: string,
		newPassword: string,
		currentPassword?: string
	): Promise<void> {
		Guards.stringValue(this.CLASS_NAME, nameof(email), email);
		Guards.stringValue(this.CLASS_NAME, nameof(newPassword), newPassword);

		try {
			if (newPassword.length < this._minPasswordLength) {
				throw new GeneralError(this.CLASS_NAME, "passwordTooShort", {
					minLength: this._minPasswordLength
				});
			}

			const user = await this._userEntityStorage.get(email);
			if (!user) {
				throw new NotFoundError(this.CLASS_NAME, "userNotFound", email);
			}

			if (Is.stringValue(currentPassword)) {
				const saltBytes = Converter.base64ToBytes(user.salt);
				const passwordBytes = Converter.utf8ToBytes(currentPassword);

				const hashedPassword = await PasswordHelper.hashPassword(passwordBytes, saltBytes);

				if (hashedPassword !== user.password) {
					throw new GeneralError(this.CLASS_NAME, "currentPasswordMismatch");
				}
			}

			const saltBytes = RandomHelper.generate(16);
			const passwordBytes = Converter.utf8ToBytes(newPassword);

			const hashedPassword = await PasswordHelper.hashPassword(passwordBytes, saltBytes);

			const updatedUser: AuthenticationUser = {
				email,
				salt: Converter.bytesToBase64(saltBytes),
				password: hashedPassword,
				identity: user.identity
			};

			await this._userEntityStorage.set(updatedUser);
		} catch (error) {
			throw new GeneralError(this.CLASS_NAME, "updatePasswordFailed", undefined, error);
		}
	}
}
