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
import { type ILoggingConnector, LoggingConnectorFactory } from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import { HttpStatusCode } from "@gtsc/web";
import type { ApiKey } from "../entities/apiKey";

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
	 * The logging connector.
	 * @internal
	 */
	private readonly _logging: ILoggingConnector;

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
	 * @param options.loggingConnectorType The type of logging connector to use, defaults to "logging".
	 * @param options.headerName The name of the header to look for the API key, defaults to "x-api-key".
	 * @returns Promise that resolves when the processor is initialized.
	 */
	constructor(options: {
		entityStorageConnectorType?: string;
		loggingConnectorType?: string;
		headerName?: string;
	}) {
		Guards.object(this.CLASS_NAME, nameof(options), options);
		this._entityStorageConnector = EntityStorageConnectorFactory.get(
			options?.entityStorageConnectorType ?? "api-key"
		);
		this._logging = LoggingConnectorFactory.get(options.loggingConnectorType ?? "logging");
		this._headerName = options.headerName ?? "x-api-key";
	}

	/**
	 * Bootstrap the service by creating and initializing any resources it needs.
	 * @param systemPartitionId The system partition id.
	 * @returns Nothing.
	 */
	public async bootstrap(systemPartitionId: string): Promise<void> {
		let hasKey = false;

		try {
			const systemApiKey = await this._entityStorageConnector.get("system", "owner", {
				partitionId: systemPartitionId
			});
			hasKey = !Is.empty(systemApiKey?.key);

			if (hasKey) {
				this._logging.log(
					{
						level: "info",
						source: this.CLASS_NAME,
						message: "apiKeyFound",
						data: {
							apiKey: systemApiKey?.key
						}
					},
					{ partitionId: systemPartitionId }
				);
			}
		} catch {}

		if (!hasKey) {
			const apiKey = Converter.bytesToBase64(RandomHelper.generate(32));

			await this._entityStorageConnector.set(
				{
					key: apiKey,
					partitionId: systemPartitionId,
					owner: "system"
				},
				{ partitionId: systemPartitionId }
			);

			this._logging.log(
				{
					level: "info",
					source: this.CLASS_NAME,
					message: "apiKeyCreated",
					data: {
						apiKey
					}
				},
				{ partitionId: systemPartitionId }
			);
		}
	}

	/**
	 * The service needs to be started when the application is initialized.
	 * @param systemPartitionId The system partition id.
	 * @returns Nothing.
	 */
	public async start(systemPartitionId: string): Promise<void> {
		this._systemPartitionId = systemPartitionId;
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
