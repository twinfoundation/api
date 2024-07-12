// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { readFile } from "node:fs/promises";
import type { HealthStatus, IHealthInfo, IInformation } from "@gtsc/api-models";
import { Is } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import type { IServerHealth } from "../models/IServerHealth";
import type { IServerInfo } from "../models/IServerInfo";

/**
 * The information service for the server.
 */
export class InformationService implements IInformation {
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
	 * The OpenAPI spec.
	 * @internal
	 */
	private _openApiSpec?: unknown;

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
	 * The service needs to be started when the application is initialized.
	 * @returns Nothing.
	 */
	public async start(): Promise<void> {
		const filename = this._openApiSpecPath;

		if (Is.stringValue(filename)) {
			const contentBuffer = await readFile(filename, "utf8");
			this._openApiSpec = JSON.parse(contentBuffer);
		}
	}

	/**
	 * Get the server information.
	 * @param requestContext The context of the service request.
	 * @returns The service information.
	 */
	public async info(requestContext?: IServiceRequestContext): Promise<IServerInfo> {
		return this._serverInfo;
	}

	/**
	 * Get the OpenAPI spec.
	 * @param requestContext The context of the service request.
	 * @returns The OpenAPI spec.
	 */
	public async spec(requestContext?: IServiceRequestContext): Promise<unknown> {
		return this._openApiSpec;
	}

	/**
	 * Get the server health.
	 * @param requestContext The context of the service request.
	 * @returns The service health.
	 */
	public async health(requestContext?: IServiceRequestContext): Promise<IHealthInfo> {
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
	 * @param requestContext The context of the service request.
	 * @returns Nothing.
	 */
	public async setComponentHealth(
		name: string,
		status: HealthStatus,
		details?: string,
		requestContext?: IServiceRequestContext
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
	 * @param requestContext The context of the service request.
	 * @returns Nothing.
	 */
	public async removeComponentHealth(
		name: string,
		requestContext?: IServiceRequestContext
	): Promise<void> {
		if (Is.arrayValue(this._serverHealth.components)) {
			const componentIndex = this._serverHealth.components.findIndex(c => c.name === name);
			if (componentIndex >= 0) {
				this._serverHealth.components.splice(componentIndex, 1);
			}
		}
	}
}
