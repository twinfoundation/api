// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpResponse,
	IHttpRestRouteProcessor,
	IHttpServerRequest,
	IRestRoute
} from "@gtsc/api-models";
import { Guards, Is } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import type { IStaticUserIdentityProcessorConfig } from "../models/IStaticUserIdentityProcessorConfig";

/**
 * Adds a static user identity to the request context.
 */
export class StaticUserIdentityProcessor implements IHttpRestRouteProcessor {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<StaticUserIdentityProcessor>();

	/**
	 * The fixed identity for request context.
	 * @internal
	 */
	private readonly _userIdentity: string;

	/**
	 * Create a new instance of StaticIdentityProcessor.
	 * @param options Options for the processor.
	 * @param options.config The configuration for the processor.
	 * @returns Promise that resolves when the processor is initialized.
	 */
	constructor(options: { config: IStaticUserIdentityProcessorConfig }) {
		Guards.object(this.CLASS_NAME, nameof(options), options);
		Guards.object(this.CLASS_NAME, nameof(options.config), options.config);
		Guards.stringValue(
			this.CLASS_NAME,
			nameof(options.config.userIdentity),
			options.config.userIdentity
		);
		this._userIdentity = options.config.userIdentity;
	}

	/**
	 * Pre process the REST request for the specified route.
	 * @param request The incoming request.
	 * @param response The outgoing response.
	 * @param route The route to process.
	 * @param requestContext The context for the request.
	 * @param state The state for the request.
	 */
	public async pre(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestContext: IServiceRequestContext,
		state: { [id: string]: unknown }
	): Promise<void> {
		if (!Is.empty(route) && !(route.skipAuth ?? false)) {
			requestContext.userIdentity = this._userIdentity;
		}
	}
}
