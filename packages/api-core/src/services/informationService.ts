// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "@gtsc/core";
import type { IRequestContext, IService } from "@gtsc/services";
import type { IServerHealth } from "../models/IServerHealth";
import type { IServerInfo } from "../models/IServerInfo";
import type { ServerHealthStatus } from "../models/serverHealthStatus";

/**
 * The information service for the server.
 */
export class InformationService implements IService {
	/**
	 * The server information.
	 * @internal
	 */
	private readonly _serverInfo: IServerInfo;

	/**
	 * The server health.
	 * @internal
	 */
	private readonly _serverHealth: IServerHealth;

	/**
	 * Create a new instance of InformationService.
	 * @param serverInfo The server information.
	 */
	constructor(serverInfo: IServerInfo) {
		this._serverInfo = serverInfo;
		this._serverHealth = {
			status: "ok"
		};
	}

	/**
	 * Bootstrap the service by creating and initializing any resources it needs.
	 * @param requestContext The request context for bootstrapping.
	 * @returns Nothing.
	 */
	public async bootstrap?(requestContext: IRequestContext): Promise<void> {}

	/**
	 * Get the server information.
	 * @returns The service information.
	 */
	public async serverInformation(): Promise<IServerInfo> {
		return this._serverInfo;
	}

	/**
	 * Get the server health.
	 * @returns The service health.
	 */
	public async serverHealth(): Promise<IServerHealth> {
		let errorCount = 0;
		let warningCount = 0;

		if (Is.arrayValue(this._serverHealth.components)) {
			errorCount = this._serverHealth.components.filter(c => c.status === "error").length;
			warningCount = this._serverHealth.components.filter(c => c.status === "warning").length;
		}

		if (errorCount > 0) {
			this._serverHealth.status = "error";
		} else if (warningCount > 0) {
			this._serverHealth.status = "warning";
		} else {
			this._serverHealth.status = "ok";
		}

		return this._serverHealth;
	}

	/**
	 * Set the status of a component.
	 * @param name The component name.
	 * @param status The status of the component.
	 * @param details The details for the status.
	 */
	public async setComponentHealth(
		name: string,
		status: ServerHealthStatus,
		details?: string
	): Promise<void> {
		const component = this._serverHealth.components?.find(c => c.name === name);

		if (Is.undefined(component)) {
			this._serverHealth.components ??= [];
			this._serverHealth.components.push({
				name,
				status,
				details
			});
		} else {
			component.status = status;
			component.details = details;
		}
	}

	/**
	 * Remove the status of a component.
	 * @param name The component name.
	 */
	public async removeComponentHealth(name: string): Promise<void> {
		if (Is.arrayValue(this._serverHealth.components)) {
			const componentIndex = this._serverHealth.components.findIndex(c => c.name === name);
			if (componentIndex >= 0) {
				this._serverHealth.components.splice(componentIndex, 1);
			}
		}
	}
}
