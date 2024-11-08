// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IBaseRoute,
	IBaseRouteProcessor,
	IHttpRequestIdentity,
	IHttpResponse,
	IHttpServerRequest
} from "@twin.org/api-models";
import { Guards } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";

/**
 * Adds a node identity to the request identity.
 */
export class NodeIdentityProcessor implements IBaseRouteProcessor {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<NodeIdentityProcessor>();

	/**
	 * The node identity for request context.
	 * @internal
	 */
	private _nodeIdentity?: string;

	/**
	 * The service needs to be started when the application is initialized.
	 * @param nodeIdentity The identity of the node.
	 * @param nodeLoggingConnectorType The node logging connector type, defaults to "node-logging".
	 * @returns Nothing.
	 */
	public async start(nodeIdentity: string, nodeLoggingConnectorType?: string): Promise<void> {
		Guards.string(this.CLASS_NAME, nameof(nodeIdentity), nodeIdentity);
		this._nodeIdentity = nodeIdentity;
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
		requestIdentity.nodeIdentity = this._nodeIdentity;
	}
}
