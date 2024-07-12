// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HealthStatus } from "./healthStatus";

/**
 * The status of the server.
 */
export interface IHealthInfo {
	/**
	 * The status.
	 */
	status: HealthStatus;

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
		status: HealthStatus;

		/**
		 * The details for the status.
		 */
		details?: string;
	}[];
}
