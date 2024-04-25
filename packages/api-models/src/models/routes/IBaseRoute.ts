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
	 * Skips the tenant authentication for this route.
	 */
	skipTenantAuth?: boolean;

	/**
	 * Skips the subject authentication for this route.
	 */
	skipSubjectAuth?: boolean;
}
