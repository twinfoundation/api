// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	HealthStatus,
	IBaseRestClientConfig,
	IHealthInfo,
	IHttpRequest,
	IInformation
} from "@gtsc/api-models";
import { NotSupportedError, StringHelper } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { BaseRestClient } from "./baseRestClient";
import type { IServerHealthResponse } from "../models/IServerHealthResponse";
import type { IServerInfo } from "../models/IServerInfo";
import type { IServerInfoResponse } from "../models/IServerInfoResponse";
import type { IServerSpecResponse } from "../models/IServerSpecResponse";

/**
 * The information service for the server.
 */
export class InformationClient extends BaseRestClient implements IInformation {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<InformationClient>();

	/**
	 * Create a new instance of InformationClient.
	 * @param config The configuration for the client.
	 */
	constructor(config: IBaseRestClientConfig) {
		super(nameof<InformationClient>(), config, StringHelper.kebabCase(nameof<IInformation>()));
	}

	/**
	 * Get the server information.
	 * @returns The service information.
	 */
	public async info(): Promise<IServerInfo> {
		const response = await this.fetch<IHttpRequest, IServerInfoResponse>("/info", "GET");
		return response.body;
	}

	/**
	 * Get the OpenAPI spec.
	 * @returns The OpenAPI spec.
	 */
	public async spec(): Promise<unknown> {
		const response = await this.fetch<IHttpRequest, IServerSpecResponse>("/spec", "GET");
		return response.body;
	}

	/**
	 * Get the server health.
	 * @returns The service health.
	 */
	public async health(): Promise<IHealthInfo> {
		const response = await this.fetch<IHttpRequest, IServerHealthResponse>("/health", "GET");
		return response.body;
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
		throw new NotSupportedError(this.CLASS_NAME, nameof("setComponentHealth"));
	}

	/**
	 * Remove the status of a component.
	 * @param name The component name.
	 * @returns Nothing.
	 */
	public async removeComponentHealth(name: string): Promise<void> {
		throw new NotSupportedError(this.CLASS_NAME, nameof("removeComponentHealth"));
	}
}
