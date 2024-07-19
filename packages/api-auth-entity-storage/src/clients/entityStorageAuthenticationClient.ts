// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { BaseRestClient } from "@gtsc/api-core";
import type { IBaseRestClientConfig } from "@gtsc/api-models";
import { Guards, StringHelper } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { ILoginRequest } from "../models/api/ILoginRequest";
import type { ILoginResponse } from "../models/api/ILoginResponse";
import type { IAuthentication } from "../models/IAuthentication";

/**
 * The client to connect to the authentication service.
 */
export class EntityStorageAuthenticationClient extends BaseRestClient implements IAuthentication {
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
			StringHelper.kebabCase(nameof<IAuthentication>())
		);
	}

	/**
	 * Perform a login for the user.
	 * @param email The email address for the user.
	 * @param password The password for the user.
	 * @returns The authentication token for the user.
	 */
	public async login(email: string, password: string): Promise<string> {
		Guards.stringValue(this.CLASS_NAME, nameof(email), email);
		Guards.stringValue(this.CLASS_NAME, nameof(password), password);

		const response = await this.fetch<ILoginRequest, ILoginResponse>("/", "POST");
		return response.body.token;
	}
}
