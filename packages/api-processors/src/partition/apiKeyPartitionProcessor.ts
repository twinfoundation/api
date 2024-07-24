// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import {
	ResponseHelper,
	type IHttpResponse,
	type IHttpRestRouteProcessor,
	type IHttpServerRequest,
	type IRestRoute
} from "@gtsc/api-models";
import { Converter, Guards, Is, RandomHelper, UnauthorizedError } from "@gtsc/core";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@gtsc/entity-storage-models";
import { LoggingConnectorFactory } from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import { HttpStatusCode } from "@gtsc/web";
import type { ApiKey } from "../entities/apiKey";
import type { IApiKeyPartitionProcessorConfig } from "../models/IApiKeyPartitionProcessorConfig";

/**
 * Lookup Api Keys in entity storage to try and find the associated partition id.
 */
export class ApiKeyPartitionProcessor implements IHttpRestRouteProcessor {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<ApiKeyPartitionProcessor>();

	/**
	 * The entity storage for the api keys.
	 * @internal
	 */
	private readonly _entityStorageConnector: IEntityStorageConnector<ApiKey>;

	/**
	 * The name of the header to look for the API key.
	 * @internal
	 */
	private readonly _headerName: string;

	/**
	 * The fixed partition id used for looking up the api keys.
	 * @internal
	 */
	private _systemPartitionId?: string;

	/**
	 * Create a new instance of ApiKeyPartitionProcessor.
	 * @param options Options for the processor.
	 * @param options.entityStorageConnectorType The type for the entity storage connector, defaults to "api-key".
	 * @param options.config The configuration for the processor.
	 * @returns Promise that resolves when the processor is initialized.
	 */
	constructor(options?: {
		entityStorageConnectorType?: string;
		config?: IApiKeyPartitionProcessorConfig;
	}) {
		this._entityStorageConnector = EntityStorageConnectorFactory.get(
			options?.entityStorageConnectorType ?? "api-key"
		);
		this._headerName = options?.config?.headerName ?? "x-api-key";
	}

	/**
	 * Bootstrap the service by creating and initializing any resources it needs.
	 * @param systemRequestContext The system request context.
	 * @param systemLoggingConnectorType The system logging connector type, defaults to "system-logging".
	 * @returns Nothing.
	 */
	public async bootstrap(
		systemRequestContext: IServiceRequestContext,
		systemLoggingConnectorType?: string
	): Promise<void> {
		Guards.stringValue(
			this.CLASS_NAME,
			nameof(systemRequestContext.partitionId),
			systemRequestContext.partitionId
		);
		Guards.stringValue(
			this.CLASS_NAME,
			nameof(systemRequestContext.identity),
			systemRequestContext.identity
		);

		const systemLogging = LoggingConnectorFactory.getIfExists(
			systemLoggingConnectorType ?? "system-logging"
		);

		let hasKey = false;

		try {
			const systemApiKey = await this._entityStorageConnector.get(
				"system",
				"owner",
				systemRequestContext
			);
			hasKey = !Is.empty(systemApiKey?.key);

			if (hasKey) {
				await systemLogging?.log(
					{
						level: "info",
						source: this.CLASS_NAME,
						message: "apiKeyFound",
						data: {
							apiKey: systemApiKey?.key
						}
					},
					systemRequestContext
				);
			}
		} catch {}

		if (!hasKey) {
			const apiKey = Converter.bytesToBase64(RandomHelper.generate(32));

			await this._entityStorageConnector.set(
				{
					key: apiKey,
					partitionId: systemRequestContext.partitionId,
					owner: systemRequestContext.identity
				},
				systemRequestContext
			);

			await systemLogging?.log(
				{
					level: "info",
					source: this.CLASS_NAME,
					message: "apiKeyCreated",
					data: {
						apiKey
					}
				},
				systemRequestContext
			);
		}
	}

	/**
	 * The service needs to be started when the application is initialized.
	 * @param systemRequestContext The system request context.
	 * @param systemLoggingConnectorType The system logging connector type, defaults to "system-logging".
	 * @returns Nothing.
	 */
	public async start(
		systemRequestContext: IServiceRequestContext,
		systemLoggingConnectorType?: string
	): Promise<void> {
		this._systemPartitionId = systemRequestContext.partitionId;
	}

	/**
	 * Process the REST request for the specified route.
	 * @param request The incoming request.
	 * @param response The outgoing response.
	 * @param route The route to process.
	 * @param requestContext The context for the request.
	 * @param state The state for the request.
	 */
	public async process(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestContext: IServiceRequestContext,
		state: { [id: string]: unknown }
	): Promise<void> {
		if (!Is.empty(route) && !(route.skipPartition ?? false)) {
			const apiKey = request?.headers?.[this._headerName] ?? request?.query?.[this._headerName];
			if (!Is.stringValue(apiKey)) {
				ResponseHelper.buildError(
					response,
					{
						name: UnauthorizedError.CLASS_NAME,
						message: `${this.CLASS_NAME}.apiKeyMissing`
					},
					HttpStatusCode.unauthorized
				);
			} else {
				const apiKeyEntity = await this._entityStorageConnector?.get(apiKey, undefined, {
					partitionId: this._systemPartitionId
				});
				if (!Is.object(apiKeyEntity)) {
					ResponseHelper.buildError(
						response,
						{
							name: UnauthorizedError.CLASS_NAME,
							message: `${this.CLASS_NAME}.apiKeyNotFound`
						},
						HttpStatusCode.unauthorized
					);
				} else {
					requestContext.partitionId = apiKeyEntity.partitionId;
				}
			}
		}
	}
}
