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
	 * @returns The authentication token for the user.
	 */
	login(email: string, password: string, requestContext?: IServiceRequestContext): Promise<string>;
}
