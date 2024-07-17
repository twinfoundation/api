// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpResponse,
	IHttpRestRouteProcessor,
	IHttpServerRequest,
	IRestRoute
} from "@gtsc/api-models";
import { Guards } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";

/**
 * Adds a static partition to the request context.
 */
export class StaticPartitionProcessor implements IHttpRestRouteProcessor {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<StaticPartitionProcessor>();

	/**
	 * The static partition id.
	 * @internal
	 */
	private readonly _partitionId: string;

	/**
	 * Create a new instance of StaticPartitionProcessor.
	 * @param options Options for the processor.
	 * @param options.partitionId The static partition id.
	 * @returns Promise that resolves when the processor is initialized.
	 */
	constructor(options: { partitionId: string }) {
		Guards.stringValue(this.CLASS_NAME, nameof(options?.partitionId), options?.partitionId);
		this._partitionId = options.partitionId;
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
		requestContext.partitionId = this._partitionId;
	}
}
