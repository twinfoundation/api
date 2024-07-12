// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IService, IServiceRequestContext } from "@gtsc/services";
import type { HealthStatus } from "./healthStatus";
import type { IHealthInfo } from "./IHealthInfo";
import type { IServerInfo } from "./IServerInfo";

/**
 * The information service for the server.
 */
export interface IInformation extends IService {
	/**
	 * Get the server information.
	 * @param requestContext The context of the service request.
	 * @returns The service information.
	 */
	info(requestContext?: IServiceRequestContext): Promise<IServerInfo>;

	/**
	 * Get the OpenAPI spec.
	 * @param requestContext The context of the service request.
	 * @returns The OpenAPI spec.
	 */
	spec(requestContext?: IServiceRequestContext): Promise<unknown>;

	/**
	 * Get the server health.
	 * @param requestContext The context of the service request.
	 * @returns The service health.
	 */
	health(requestContext?: IServiceRequestContext): Promise<IHealthInfo>;

	/**
	 * Set the status of a component.
	 * @param name The component name.
	 * @param status The status of the component.
	 * @param details The details for the status.
	 * @param requestContext The context of the service request.
	 * @returns Nothing.
	 */
	setComponentHealth(
		name: string,
		status: HealthStatus,
		details?: string,
		requestContext?: IServiceRequestContext
	): Promise<void>;

	/**
	 * Remove the status of a component.
	 * @param name The component name.
	 * @param requestContext The context of the service request.
	 * @returns Nothing.
	 */
	removeComponentHealth(name: string, requestContext?: IServiceRequestContext): Promise<void>;
}
