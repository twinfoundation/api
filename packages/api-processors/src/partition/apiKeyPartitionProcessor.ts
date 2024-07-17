// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpResponse,
	IHttpRestRouteProcessor,
	IHttpServerRequest,
	IRestRoute
} from "@gtsc/api-models";
import { Guards, Is, UnauthorizedError } from "@gtsc/core";
import {
	EntityStorageConnectorFactory,
	type IEntityStorageConnector
} from "@gtsc/entity-storage-models";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import { HttpStatusCode } from "@gtsc/web";

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
	private readonly _entityStorageConnector: IEntityStorageConnector;

	/**
	 * The name of the header to look for the API key.
	 * @internal
	 */
	private readonly _headerName: string;

	/**
	 * The fixed partition id used for looking up the api keys.
	 * @internal
	 */
	private readonly _fixedPartitionId: string;

	/**
	 * Create a new instance of ApiKeyPartitionProcessor.
	 * @param options Options for the processor.
	 * @param options.entityStorageConnectorType The type for the entity storage connector, defaults to "api-key".
	 * @param options.fixedPartitionId The partition id for the api keys.
	 * @param options.headerName The name of the header to look for the API key, defaults to "x-api-key".
	 * @returns Promise that resolves when the processor is initialized.
	 */
	constructor(options: {
		entityStorageConnectorType?: string;
		fixedPartitionId: string;
		headerName?: string;
	}) {
		this._entityStorageConnector = EntityStorageConnectorFactory.get(
			options?.entityStorageConnectorType ?? "api-key"
		);
		Guards.stringValue(
			this.CLASS_NAME,
			nameof(options?.fixedPartitionId),
			options?.fixedPartitionId
		);
		this._fixedPartitionId = options.fixedPartitionId;
		this._headerName = options.headerName ?? "x-api-key";
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
		const apiKey = request?.headers?.[this._headerName] ?? request?.query?.[this._headerName];
		if (!Is.stringValue(apiKey)) {
			response.body = {
				name: UnauthorizedError.CLASS_NAME,
				message: `${this.CLASS_NAME}.apiKeyMissing`
			};
			response.statusCode = HttpStatusCode.unauthorized;
		} else {
			const apiKeyEntity = await this._entityStorageConnector?.get(apiKey, undefined, {
				partitionId: this._fixedPartitionId
			});
			if (!Is.object(apiKeyEntity)) {
				response.body = {
					name: UnauthorizedError.CLASS_NAME,
					message: `${this.CLASS_NAME}.apiKeyNotFound`
				};
				response.statusCode = HttpStatusCode.unauthorized;
			} else {
				requestContext.partitionId = apiKeyEntity.partitionId;
			}
		}
	}
}
