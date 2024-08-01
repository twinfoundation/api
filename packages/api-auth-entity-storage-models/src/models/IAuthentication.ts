// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IService, IServiceRequestContext } from "@gtsc/services";

/**
 * Contract definition for authentication service.
 */
export interface IAuthentication extends IService {
	/**
	 * Perform a login for the user.
	 * @param email The email address for the user.
	 * @param password The password for the user.
	 * @param requestContext The context for the request.
	 * @returns The authentication token for the user, if it uses a mechanism with public access.
	 */
	login(
		email: string,
		password: string,
		requestContext?: IServiceRequestContext
	): Promise<string | undefined>;

	/**
	 * Logout the current user.
	 * @param token The token to logout, if it uses a mechanism with public access.
	 * @param requestContext The context for the request.
	 * @returns Nothing.
	 */
	logout(token?: string, requestContext?: IServiceRequestContext): Promise<void>;

	/**
	 * Refresh the token.
	 * @param token The token to refresh, if it uses a mechanism with public access.
	 * @param requestContext The context for the request.
	 * @returns The refreshed token, if it uses a mechanism with public access.
	 */
	refresh(token?: string, requestContext?: IServiceRequestContext): Promise<string | undefined>;
}
