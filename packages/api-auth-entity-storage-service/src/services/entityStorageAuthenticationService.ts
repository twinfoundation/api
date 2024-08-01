// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuthentication } from "@gtsc/api-auth-entity-storage-models";
import { Converter, GeneralError, Guards, UnauthorizedError } from "@gtsc/core";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@gtsc/entity-storage-models";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
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
	 * The system partition id to use for the vault.
	 * @internal
	 */
	private _systemPartitionId?: string;

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
	 * @param systemRequestContext The system request context.
	 * @param systemLoggingConnectorType The system logging connector type, defaults to "system-logging".
	 * @returns Nothing.
	 */
	public async start(
		systemRequestContext: IServiceRequestContext,
		systemLoggingConnectorType?: string
	): Promise<void> {
		this._systemPartitionId = systemRequestContext.partitionId;
		this._systemIdentity = systemRequestContext.systemIdentity;
	}

	/**
	 * Perform a login for the user.
	 * @param email The email address for the user.
	 * @param password The password for the user.
	 * @param requestContext The context for the request.
	 * @returns The authentication token for the user, if it uses a mechanism with public access.
	 */
	public async login(
		email: string,
		password: string,
		requestContext?: IServiceRequestContext
	): Promise<string | undefined> {
		Guards.stringValue(this.CLASS_NAME, nameof(email), email);
		Guards.stringValue(this.CLASS_NAME, nameof(password), password);

		try {
			const systemRequestContext: IServiceRequestContext = {
				systemIdentity: this._systemIdentity,
				userIdentity: this._systemIdentity,
				partitionId: this._systemPartitionId
			};

			const user = await this._userEntityStorage.get(email, undefined, systemRequestContext);
			if (!user) {
				throw new GeneralError(this.CLASS_NAME, "userNotFound");
			}

			const saltBytes = Converter.base64ToBytes(user.salt);
			const passwordBytes = Converter.utf8ToBytes(password);

			const hashedPassword = await PasswordHelper.hashPassword(passwordBytes, saltBytes);

			if (hashedPassword !== user.password) {
				throw new GeneralError(this.CLASS_NAME, "passwordMismatch");
			}

			const token = await TokenHelper.createToken(
				this._systemIdentity,
				this._systemPartitionId,
				this._vaultConnector,
				this._signingKeyName,
				user.identity,
				this._defaultTtlMinutes
			);

			return token;
		} catch (error) {
			throw new UnauthorizedError(this.CLASS_NAME, "loginFailed", error);
		}
	}

	/**
	 * Logout the current user.
	 * @param token The token to logout, if it uses a mechanism with public access.
	 * @param requestContext The context for the request.
	 * @returns Nothing.
	 */
	public async logout(token?: string, requestContext?: IServiceRequestContext): Promise<void> {
		// Nothing to do here.
	}

	/**
	 * Refresh the token.
	 * @param token The token to refresh, if it uses a mechanism with public access.
	 * @param requestContext The context for the request.
	 * @returns The refreshed token, if it uses a mechanism with public access.
	 */
	public async refresh(
		token?: string,
		requestContext?: IServiceRequestContext
	): Promise<string | undefined> {
		// If the verify fails on the current token then it will throw an exception.
		const headerAndPayload = await TokenHelper.verify(
			this._systemIdentity,
			this._systemPartitionId,
			this._vaultConnector,
			this._signingKeyName,
			token
		);

		const refreshToken = await TokenHelper.createToken(
			this._systemIdentity,
			this._systemPartitionId,
			this._vaultConnector,
			this._signingKeyName,
			headerAndPayload.payload.sub ?? "",
			this._defaultTtlMinutes
		);

		return refreshToken;
	}
}
