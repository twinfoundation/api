// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { ServerHealthStatus } from "./serverHealthStatus";

/**
 * The status of the server.
 */
export interface IServerHealth {
	/**
	 * The status.
	 */
	status: ServerHealthStatus;

	/**
	 * The status of the components.
	 */
	components?: {
		/**
		 * The name of the component.
		 */
		name: string;

		/**
		 * The status of the component.
		 */
		status: ServerHealthStatus;

		/**
		 * The details for the status.
		 */
		details?: string;
	}[];
}
