// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Interface which defines a route.
 */
export interface IBaseRoute {
	/**
	 * The id of the operation.
	 */
	operationId: string;

	/**
	 * The path to use for routing.
	 */
	path: string;

	/**
	 * Skips the authentication for this route.
	 */
	skipAuth?: boolean;

	/**
	 * Skips the partition id check for this route.
	 */
	skipPartition?: boolean;
}
