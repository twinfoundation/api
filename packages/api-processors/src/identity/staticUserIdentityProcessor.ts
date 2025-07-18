// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IBaseRoute,
	IBaseRouteProcessor,
	IHttpRequestIdentity,
	IHttpResponse,
	IHttpServerRequest
} from "@twin.org/api-models";
import { Guards, Is } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import type { IStaticUserIdentityProcessorConstructorOptions } from "../models/IStaticUserIdentityProcessorConstructorOptions";

/**
 * Adds a static user identity to the request context.
 */
export class StaticUserIdentityProcessor implements IBaseRouteProcessor {
	/**
	 * The namespace supported by the processor.
	 */
	public static readonly NAMESPACE: string = "static-user-identity";

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
	 */
	constructor(options: IStaticUserIdentityProcessorConstructorOptions) {
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
	 * @param requestIdentity The identity context for the request.
	 * @param processorState The state handed through the processors.
	 */
	public async pre(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IBaseRoute | undefined,
		requestIdentity: IHttpRequestIdentity,
		processorState: { [id: string]: unknown }
	): Promise<void> {
		if (!Is.empty(route) && !(route.skipAuth ?? false)) {
			requestIdentity.userIdentity = this._userIdentity;
		}
	}
}
