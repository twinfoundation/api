// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IComponent } from "@twin.org/core";
import type { HealthStatus } from "./healthStatus";
import type { IHealthInfo } from "./IHealthInfo";
import type { IServerInfo } from "./IServerInfo";

/**
 * The information component for the server.
 */
export interface IInformationComponent extends IComponent {
	/**
	 * Get the server information.
	 * @returns The service information.
	 */
	info(): Promise<IServerInfo>;

	/**
	 * Get the OpenAPI spec.
	 * @returns The OpenAPI spec.
	 */
	spec(): Promise<unknown>;

	/**
	 * Get the server health.
	 * @returns The service health.
	 */
	health(): Promise<IHealthInfo>;

	/**
	 * Set the status of a component.
	 * @param name The component name.
	 * @param status The status of the component.
	 * @param details The details for the status.
	 * @returns Nothing.
	 */
	setComponentHealth(name: string, status: HealthStatus, details?: string): Promise<void>;

	/**
	 * Remove the status of a component.
	 * @param name The component name.
	 * @returns Nothing.
	 */
	removeComponentHealth(name: string): Promise<void>;
}
