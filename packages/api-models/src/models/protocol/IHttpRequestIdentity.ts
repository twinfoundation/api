// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Context data from the HTTP request identity.
 */
export interface IHttpRequestIdentity {
	/**
	 * The identity of the node the request is being performed on.
	 */
	nodeIdentity?: string;

	/**
	 * The identity of the requestor if there is an authenticated user.
	 */
	userIdentity?: string;
}
