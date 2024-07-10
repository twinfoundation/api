// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IService } from "@gtsc/services";
import type { IServerHealth } from "../models/IServerHealth";
import type { IServerInfo } from "../models/IServerInfo";
import type { ServerHealthStatus } from "../models/serverHealthStatus";

/**
 * The information service for the server.
 */
export class InformationService implements IService {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<InformationService>();

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
	 * The path to the OpenAPI Spec.
	 * @internal
	 */
	private readonly _openApiSpecPath?: string;

	/**
	 * Create a new instance of InformationService.
	 * @param serverInfo The server information.
	 * @param openApiSpecPath The path to the spec file.
	 */
	constructor(serverInfo: IServerInfo, openApiSpecPath?: string) {
		this._serverInfo = serverInfo;
		this._serverHealth = {
			status: "ok"
		};
		this._openApiSpecPath = openApiSpecPath;
	}

	/**
	 * Get the server information.
	 * @returns The service information.
	 */
	public serverInformation(): IServerInfo {
		return this._serverInfo;
	}

	/**
	 * Get the path to the OpenAPI spec.
	 * @returns The OpenAPI spec path.
	 */
	public openApiSpecPath(): string | undefined {
		return this._openApiSpecPath;
	}

	/**
	 * Get the server health.
	 * @returns The service health.
	 */
	public serverHealth(): IServerHealth {
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
	public setComponentHealth(name: string, status: ServerHealthStatus, details?: string): void {
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
	public removeComponentHealth(name: string): void {
		if (Is.arrayValue(this._serverHealth.components)) {
			const componentIndex = this._serverHealth.components.findIndex(c => c.name === name);
			if (componentIndex >= 0) {
				this._serverHealth.components.splice(componentIndex, 1);
			}
		}
	}
}
