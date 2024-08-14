// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IAuthenticationService,
	ILoginRequest,
	ILoginResponse,
	ILogoutRequest,
	IRefreshTokenRequest,
	IRefreshTokenResponse
} from "@gtsc/api-auth-entity-storage-models";
import { BaseRestClient } from "@gtsc/api-core";
import type { IBaseRestClientConfig, INoContentResponse } from "@gtsc/api-models";
import { Guards, StringHelper } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";

/**
 * The client to connect to the authentication service.
 */
export class EntityStorageAuthenticationClient
	extends BaseRestClient
	implements IAuthenticationService
{
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<EntityStorageAuthenticationClient>();

	/**
	 * Create a new instance of EntityStorageAuthenticationClient.
	 * @param config The configuration for the client.
	 */
	constructor(config: IBaseRestClientConfig) {
		super(
			nameof<EntityStorageAuthenticationClient>(),
			config,
			StringHelper.kebabCase(nameof<IAuthenticationService>())
		);
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

		const response = await this.fetch<ILoginRequest, ILoginResponse>("/login", "POST", {
			body: {
				email,
				password
			}
		});

		return response.body;
	}

	/**
	 * Logout the current user.
	 * @param token The token to logout, if it uses a mechanism with public access.
	 * @returns Nothing.
	 */
	public async logout(token?: string): Promise<void> {
		await this.fetch<ILogoutRequest, INoContentResponse>("/logout", "GET", {
			query: {
				token
			}
		});
	}

	/**
	 * Refresh the token.
	 * @param token The token to refresh, if it uses a mechanism with public access.
	 * @returns The refreshed token, if it uses a mechanism with public access.
	 */
	public async refresh(token?: string): Promise<{
		token?: string;
		expiry: number;
	}> {
		const response = await this.fetch<IRefreshTokenRequest, IRefreshTokenResponse>(
			"/refresh",
			"GET",
			{
				query: {
					token
				}
			}
		);

		return response.body;
	}
}
