// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IAuthentication } from "@gtsc/api-auth-entity-storage-models";
import { Converter, GeneralError, Guards, Is, RandomHelper, UnauthorizedError } from "@gtsc/core";
import { PasswordGenerator } from "@gtsc/crypto";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@gtsc/entity-storage-models";
import { LoggingConnectorFactory, type ILoggingConnector } from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import {
	VaultConnectorFactory,
	VaultEncryptionType,
	VaultKeyType,
	type IVaultConnector
} from "@gtsc/vault-models";
import { Jwt, JwtAlgorithms } from "@gtsc/web";
import type { AuthenticationUser } from "../entities/authenticationUser";
import type { IEntityStorageAuthenticationServiceConfig } from "../models/IEntityStorageAuthenticationServiceConfig";

/**
 * Implementation of the authentication service using entity storage.
 */
export class EntityStorageAuthenticationService implements IAuthentication {
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
	 * The logging connector.
	 * @internal
	 */
	private readonly _logging: ILoggingConnector;

	/**
	 * The name of the key to retrieve from the vault for signing JWT.
	 * @internal
	 */
	private readonly _signingKeyName: string;

	/**
	 * The name of the key to retrieve from the vault for encrypting passwords.
	 * @internal
	 */
	private readonly _encryptionKeyName: string;

	/**
	 * The system identity.
	 * @internal
	 */
	private readonly _systemIdentity: string;

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
	 * @param options.loggingConnectorType The type of logging connector to use, defaults to "logging".
	 * @param options.config The configuration for the authentication.
	 */
	constructor(options: {
		userEntityStorageType?: string;
		vaultConnectorType?: string;
		loggingConnectorType?: string;
		config: IEntityStorageAuthenticationServiceConfig;
	}) {
		Guards.object(this.CLASS_NAME, nameof(options), options);
		Guards.object(this.CLASS_NAME, nameof(options.config), options.config);
		Guards.stringValue(
			this.CLASS_NAME,
			nameof(options.config.systemIdentity),
			options.config.systemIdentity
		);

		this._userEntityStorage = EntityStorageConnectorFactory.get(
			options?.userEntityStorageType ?? "authentication-user"
		);

		this._vaultConnector = VaultConnectorFactory.get(options?.vaultConnectorType ?? "vault");
		this._logging = LoggingConnectorFactory.get(options?.loggingConnectorType ?? "logging");
		this._signingKeyName = options?.config?.signingKeyName ?? "auth-signing";
		this._encryptionKeyName = options?.config?.signingKeyName ?? "auth-encryption";
		this._systemIdentity = options.config.systemIdentity;
	}

	/**
	 * Bootstrap the service by creating and initializing any resources it needs.
	 * @param systemPartitionId The system partition id.
	 * @returns Nothing.
	 */
	public async bootstrap(systemPartitionId: string): Promise<void> {
		let hasSigningKey = false;
		let hasEncryptionKey = false;
		let hasSystemUser = false;

		const systemRequestContext: IServiceRequestContext = {
			identity: this._systemIdentity,
			partitionId: systemPartitionId
		};

		try {
			const vaultKey = await this._vaultConnector.getKey(
				this._signingKeyName,
				systemRequestContext
			);
			hasSigningKey = vaultKey.type === VaultKeyType.Ed25519;

			if (hasSigningKey) {
				await this._logging.log(
					{
						level: "info",
						source: this.CLASS_NAME,
						message: "signingKeyFound"
					},
					systemRequestContext
				);
			}
		} catch {}

		if (!hasSigningKey) {
			await this._vaultConnector.createKey(
				this._signingKeyName,
				VaultKeyType.Ed25519,
				systemRequestContext
			);

			await this._logging.log(
				{
					level: "info",
					source: this.CLASS_NAME,
					message: "signingKeyCreated"
				},
				systemRequestContext
			);
		}

		try {
			const vaultKey = await this._vaultConnector.getKey(
				this._encryptionKeyName,
				systemRequestContext
			);
			hasEncryptionKey = vaultKey.type === VaultKeyType.Ed25519;

			if (hasEncryptionKey) {
				await this._logging.log(
					{
						level: "info",
						source: this.CLASS_NAME,
						message: "encryptionKeyFound"
					},
					systemRequestContext
				);
			}
		} catch {}

		if (!hasEncryptionKey) {
			await this._vaultConnector.createKey(
				this._encryptionKeyName,
				VaultKeyType.Ed25519,
				systemRequestContext
			);

			await this._logging.log(
				{
					level: "info",
					source: this.CLASS_NAME,
					message: "encryptionKeyCreated"
				},
				systemRequestContext
			);
		}

		try {
			const systemUser = await this._userEntityStorage.get(
				"system@system",
				undefined,
				systemRequestContext
			);
			hasSystemUser = Is.notEmpty(systemUser);

			if (hasSystemUser) {
				await this._logging.log(
					{
						level: "info",
						source: this.CLASS_NAME,
						message: "systemUserFound",
						data: {
							email: systemUser?.email,
							password: systemUser?.password
						}
					},
					systemRequestContext
				);
			}
		} catch {}

		if (!hasSystemUser) {
			const generatedPassword = PasswordGenerator.generate(16);
			const passwordBytes = Converter.utf8ToBytes(generatedPassword);
			const saltBytes = RandomHelper.generate(16);

			const encryptedPassword = await this.encryptPassword(
				passwordBytes,
				saltBytes,
				systemRequestContext
			);

			const systemUser: AuthenticationUser = {
				email: "system@system",
				password: encryptedPassword,
				salt: Converter.bytesToBase64(saltBytes),
				identity: this._systemIdentity
			};

			await this._userEntityStorage.set(systemUser, systemRequestContext);

			await this._logging.log(
				{
					level: "info",
					source: this.CLASS_NAME,
					message: "systemUserCreated",
					data: {
						email: systemUser?.email,
						password: generatedPassword
					}
				},
				systemRequestContext
			);
		}
	}

	/**
	 * The service needs to be started when the application is initialized.
	 * @param systemPartitionId The system partition id.
	 * @returns Nothing.
	 */
	public async start(systemPartitionId: string): Promise<void> {
		this._systemPartitionId = systemPartitionId;
	}

	/**
	 * Perform a login for the user.
	 * @param email The email address for the user.
	 * @param password The password for the user.
	 * @param requestContext The context for the request.
	 * @returns The authentication token for the user.
	 */
	public async login(
		email: string,
		password: string,
		requestContext?: IServiceRequestContext
	): Promise<string> {
		Guards.stringValue(this.CLASS_NAME, nameof(email), email);
		Guards.stringValue(this.CLASS_NAME, nameof(password), password);

		try {
			const systemRequestContext: IServiceRequestContext = {
				identity: this._systemIdentity,
				partitionId: this._systemPartitionId
			};

			const user = await this._userEntityStorage.get(email, undefined, systemRequestContext);
			if (!user) {
				throw new GeneralError(this.CLASS_NAME, "userNotFound");
			}

			const saltBytes = Converter.base64ToBytes(user.salt);
			const passwordBytes = Converter.utf8ToBytes(password);

			const encryptedPassword = await this.encryptPassword(
				passwordBytes,
				saltBytes,
				systemRequestContext
			);

			if (encryptedPassword !== user.password) {
				throw new GeneralError(this.CLASS_NAME, "passwordMismatch");
			}

			const jwt = await Jwt.encodeWithSigner(
				{ alg: JwtAlgorithms.EdDSA },
				{
					sub: user.identity
				},
				async (alg, key, payload) =>
					this._vaultConnector.sign(this._signingKeyName, payload, systemRequestContext)
			);

			return jwt;
		} catch (error) {
			throw new UnauthorizedError(this.CLASS_NAME, "loginFailed", error);
		}
	}

	/**
	 * Encrypt the password for the user.
	 * @param passwordBytes The password bytes.
	 * @param saltBytes The salt bytes.
	 * @param requestContext The context for the request.
	 * @returns The encrypted password.
	 * @internal
	 */
	private async encryptPassword(
		passwordBytes: Uint8Array,
		saltBytes: Uint8Array,
		requestContext: IServiceRequestContext
	): Promise<string> {
		const combined = new Uint8Array(saltBytes.length + passwordBytes.length);
		combined.set(saltBytes);
		combined.set(passwordBytes, saltBytes.length);

		const encryptedPassword = await this._vaultConnector.encrypt(
			this._encryptionKeyName,
			VaultEncryptionType.ChaCha20Poly1305,
			combined,
			requestContext
		);

		return Converter.bytesToBase64(encryptedPassword);
	}
}
