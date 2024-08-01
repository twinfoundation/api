// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpResponse,
	IHttpRestRouteProcessor,
	IHttpServerRequest,
	IRestRoute
} from "@gtsc/api-models";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";

/**
 * Adds a system identity to the request context.
 */
export class SystemIdentityProcessor implements IHttpRestRouteProcessor {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<SystemIdentityProcessor>();

	/**
	 * The system identity for request context.
	 * @internal
	 */
	private _systemIdentity?: string;

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
		this._systemIdentity = systemRequestContext.systemIdentity;
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
		requestContext.systemIdentity = this._systemIdentity;
	}
}
