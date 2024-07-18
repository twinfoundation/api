// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpRestRouteProcessor,
	IHttpResponse,
	IHttpServerRequest,
	IRestRoute
} from "@gtsc/api-models";
import { Guards } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";

/**
 * Adds a static identity to the request context.
 */
export class StaticIdentityProcessor implements IHttpRestRouteProcessor {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<StaticIdentityProcessor>();

	/**
	 * The fixed identity for request context.
	 * @internal
	 */
	private readonly _identity: string;

	/**
	 * Create a new instance of StaticIdentityProcessor.
	 * @param options Options for the processor.
	 * @param options.identity The fixed identity for request context.
	 * @returns Promise that resolves when the processor is initialized.
	 */
	constructor(options: { identity: Uint8Array }) {
		Guards.object(this.CLASS_NAME, nameof(options), options);
		Guards.stringValue(this.CLASS_NAME, nameof(options?.identity), options?.identity);
		this._identity = options.identity;
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
		if (!(route?.skipAuth ?? false)) {
			requestContext.identity = this._identity;
		}
	}
}
