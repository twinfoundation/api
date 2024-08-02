// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuthentication } from "@gtsc/api-auth-entity-storage-models";
import { Converter, GeneralError, Guards, UnauthorizedError } from "@gtsc/core";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@gtsc/entity-storage-models";
import { nameof } from "@gtsc/nameof";
import { VaultConnectorFactory, type IVaultConnector } from "@gtsc/vault-models";
import type { AuthenticationUser } from "../entities/authenticationUser";
import type { IEntityStorageAuthenticationServiceConfig } from "../models/IEntityStorageAuthenticationServiceConfig";
import { PasswordHelper } from "../utils/passwordHelper";
import { TokenHelper } from "../utils/tokenHelper";

/**
 * Implementation of the authentication service using entity storage.
 */
export class EntityStorageAuthenticationService implements IAuthentication {
	/**
	 * Default TTL in minutes.
	 */
	private static readonly _DEFAULT_TTL_MINUTES: number = 60;

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<EntityStorageAuthenticationService>();

	/**
	 * The entity storage for users.
	 * @internal
	 */
	private readonly _userEntityStorage: IEntityStorageConnector<AuthenticationUser>;

	/**
	 * The vault for the keys.
	 * @internal
	 */
	private readonly _vaultConnector: IVaultConnector;

	/**
	 * The name of the key to retrieve from the vault for signing JWT.
	 * @internal
	 */
	private readonly _signingKeyName: string;

	/**
	 * The default TTL for the token.
	 * @internal
	 */
	private readonly _defaultTtlMinutes: number;

	/**
	 * The system identity.
	 * @internal
	 */
	private _systemIdentity?: string;

	/**
	 * Create a new instance of EntityStorageAuthentication.
	 * @param options The dependencies for the identity connector.
	 * @param options.userEntityStorageType The entity storage for the users, defaults to "authentication-user".
	 * @param options.vaultConnectorType The vault for the private keys, defaults to "vault".
	 * @param options.config The configuration for the authentication.
	 */
	constructor(options?: {
		userEntityStorageType?: string;
		vaultConnectorType?: string;
		config?: IEntityStorageAuthenticationServiceConfig;
	}) {
		this._userEntityStorage = EntityStorageConnectorFactory.get(
			options?.userEntityStorageType ?? "authentication-user"
		);

		this._vaultConnector = VaultConnectorFactory.get(options?.vaultConnectorType ?? "vault");
		this._signingKeyName = options?.config?.signingKeyName ?? "auth-signing";
		this._defaultTtlMinutes =
			options?.config?.defaultTtlMinutes ?? EntityStorageAuthenticationService._DEFAULT_TTL_MINUTES;
	}

	/**
	 * The service needs to be started when the application is initialized.
	 * @param systemIdentity The identity of the system.
	 * @param systemLoggingConnectorType The system logging connector type, defaults to "system-logging".
	 * @returns Nothing.
	 */
	public async start(systemIdentity: string, systemLoggingConnectorType?: string): Promise<void> {
		Guards.string(this.CLASS_NAME, nameof(systemIdentity), systemIdentity);
		this._systemIdentity = systemIdentity;
	}

	/**
	 * Perform a login for the user.
	 * @param email The email address for the user.
	 * @param password The password for the user.
	 * @returns The authentication token for the user, if it uses a mechanism with public access.
	 */
	public async login(
		email: string,
		password: string
	): Promise<{
		token?: string;
		expiry: number;
	}> {
		Guards.stringValue(this.CLASS_NAME, nameof(email), email);
		Guards.stringValue(this.CLASS_NAME, nameof(password), password);

		try {
			const user = await this._userEntityStorage.get(email);
			if (!user) {
				throw new GeneralError(this.CLASS_NAME, "userNotFound");
			}

			const saltBytes = Converter.base64ToBytes(user.salt);
			const passwordBytes = Converter.utf8ToBytes(password);

			const hashedPassword = await PasswordHelper.hashPassword(passwordBytes, saltBytes);

			if (hashedPassword !== user.password) {
				throw new GeneralError(this.CLASS_NAME, "passwordMismatch");
			}

			const tokenAndExpiry = await TokenHelper.createToken(
				this._vaultConnector,
				`${this._systemIdentity}/${this._signingKeyName}`,
				user.identity,
				this._defaultTtlMinutes
			);

			return tokenAndExpiry;
		} catch (error) {
			throw new UnauthorizedError(this.CLASS_NAME, "loginFailed", error);
		}
	}

	/**
	 * Logout the current user.
	 * @param token The token to logout, if it uses a mechanism with public access.
	 * @returns Nothing.
	 */
	public async logout(token?: string): Promise<void> {
		// Nothing to do here.
	}

	/**
	 * Refresh the token.
	 * @param token The token to refresh, if it uses a mechanism with public access.
	 * @returns The refreshed token, if it uses a mechanism with public access.
	 */
	public async refresh(token?: string): Promise<{
		token: string;
		expiry: number;
	}> {
		// If the verify fails on the current token then it will throw an exception.
		const headerAndPayload = await TokenHelper.verify(
			this._vaultConnector,
			`${this._systemIdentity}/${this._signingKeyName}`,
			token
		);

		const refreshTokenAndExpiry = await TokenHelper.createToken(
			this._vaultConnector,
			`${this._systemIdentity}/${this._signingKeyName}`,
			headerAndPayload.payload.sub ?? "",
			this._defaultTtlMinutes
		);

		return refreshTokenAndExpiry;
	}
}
