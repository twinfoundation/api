// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Interface which defines a REST route response for authentication.
 */
export interface IRestRouteResponseAuthOptions {
	/**
	 * The operation to perform, the token will be in the body if it exists.
	 */
	operation: "login" | "logout" | "refresh";
}
