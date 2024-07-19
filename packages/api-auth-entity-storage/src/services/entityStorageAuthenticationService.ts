// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter, GeneralError, Guards, UnauthorizedError } from "@gtsc/core";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@gtsc/entity-storage-models";
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
import type { IAuthentication } from "../models/IAuthentication";
import type { IEntityStorageAuthenticationConfig } from "../models/IEntityStorageAuthenticationConfig";

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
		config?: IEntityStorageAuthenticationConfig;
	}) {
		this._userEntityStorage = EntityStorageConnectorFactory.get(
			options?.userEntityStorageType ?? "authentication-user"
		);

		this._vaultConnector = VaultConnectorFactory.get(options?.vaultConnectorType ?? "vault");
		this._signingKeyName = options?.config?.signingKeyName ?? "auth-signing";
		this._encryptionKeyName = options?.config?.signingKeyName ?? "auth-encryption";
	}

	/**
	 * Bootstrap the service by creating and initializing any resources it needs.
	 * @param systemPartitionId The system partition id.
	 * @returns Nothing.
	 */
	public async bootstrap(systemPartitionId: string): Promise<void> {
		let hasKey = false;
		try {
			const vaultKey = await this._vaultConnector.getKey(this._signingKeyName, {
				partitionId: systemPartitionId
			});
			hasKey = vaultKey.type === VaultKeyType.Ed25519;
		} catch {}

		if (!hasKey) {
			await this._vaultConnector.createKey(this._signingKeyName, VaultKeyType.Ed25519, {
				partitionId: systemPartitionId
			});
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
			const user = await this._userEntityStorage.get(email, undefined, requestContext);
			if (!user) {
				throw new GeneralError(this.CLASS_NAME, "userNotFound");
			}

			const saltBytes = Converter.base64ToBytes(user.salt);
			const passwordBytes = Converter.utf8ToBytes(password);

			const combined = new Uint8Array(saltBytes.length + passwordBytes.length);
			combined.set(saltBytes);
			combined.set(passwordBytes, saltBytes.length);

			const encryptedPassword = await this._vaultConnector.encrypt(
				this._encryptionKeyName,
				VaultEncryptionType.ChaCha20Poly1305,
				combined,
				requestContext
			);

			if (Converter.bytesToBase64(encryptedPassword) !== user.password) {
				throw new GeneralError(this.CLASS_NAME, "passwordMismatch");
			}

			const jwt = await Jwt.encodeWithSigner(
				{ alg: JwtAlgorithms.EdDSA },
				{
					sub: user.identity
				},
				async (alg, key, payload) =>
					this._vaultConnector.sign(this._signingKeyName, payload, {
						partitionId: this._systemPartitionId
					})
			);

			return jwt;
		} catch (error) {
			throw new UnauthorizedError(this.CLASS_NAME, "loginFailed", error);
		}
	}
}
