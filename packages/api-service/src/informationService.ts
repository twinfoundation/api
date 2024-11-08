// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { readFile } from "node:fs/promises";
import type {
	HealthStatus,
	IHealthInfo,
	IInformationComponent,
	IServerInfo
} from "@twin.org/api-models";
import { Is } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";

/**
 * The information service for the server.
 */
export class InformationService implements IInformationComponent {
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
	private readonly _healthInfo: IHealthInfo;

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
		this._healthInfo = {
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
	 * @returns The service information.
	 */
	public async info(): Promise<IServerInfo> {
		return this._serverInfo;
	}

	/**
	 * Get the OpenAPI spec.
	 * @returns The OpenAPI spec.
	 */
	public async spec(): Promise<unknown> {
		return this._openApiSpec;
	}

	/**
	 * Get the server health.
	 * @returns The service health.
	 */
	public async health(): Promise<IHealthInfo> {
		let errorCount = 0;
		let warningCount = 0;

		if (Is.arrayValue(this._healthInfo.components)) {
			errorCount = this._healthInfo.components.filter(c => c.status === "error").length;
			warningCount = this._healthInfo.components.filter(c => c.status === "warning").length;
		}

		if (errorCount > 0) {
			this._healthInfo.status = "error";
		} else if (warningCount > 0) {
			this._healthInfo.status = "warning";
		} else {
			this._healthInfo.status = "ok";
		}

		return this._healthInfo;
	}

	/**
	 * Set the status of a component.
	 * @param name The component name.
	 * @param status The status of the component.
	 * @param details The details for the status.
	 * @returns Nothing.
	 */
	public async setComponentHealth(
		name: string,
		status: HealthStatus,
		details?: string
	): Promise<void> {
		const component = this._healthInfo.components?.find(c => c.name === name);

		if (Is.undefined(component)) {
			this._healthInfo.components ??= [];
			this._healthInfo.components.push({
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
	 * @returns Nothing.
	 */
	public async removeComponentHealth(name: string): Promise<void> {
		if (Is.arrayValue(this._healthInfo.components)) {
			const componentIndex = this._healthInfo.components.findIndex(c => c.name === name);
			if (componentIndex !== -1) {
				this._healthInfo.components.splice(componentIndex, 1);
			}
		}
	}
}
