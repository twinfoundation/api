// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpResponse,
	IHttpRestRouteProcessor,
	IHttpServerRequest,
	IRestRoute
} from "@gtsc/api-models";
import { LoggingConnectorFactory, type ILoggingConnector } from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";

/**
 * Process the REST request and log its information.
 */
export class RequestLoggingProcessor implements IHttpRestRouteProcessor {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<RequestLoggingProcessor>();

	/**
	 * The connector for logging the information.
	 * @internal
	 */
	private readonly _loggingConnector: ILoggingConnector;

	/**
	 * Include the body objects when logging the information.
	 * @internal
	 */
	private readonly _includeBody: boolean;

	/**
	 * Create a new instance of RequestLoggingProcessor.
	 * @param options Options for the processor.
	 * @param options.loggingConnectorType The type for the logging connector, defaults to "logging".
	 * @param options.includeBody Include the body objects when logging the information.
	 * @returns Promise that resolves when the processor is initialized.
	 */
	constructor(options?: { loggingConnectorType?: string; includeBody?: boolean }) {
		this._loggingConnector = LoggingConnectorFactory.get(
			options?.loggingConnectorType ?? "logging"
		);
		this._includeBody = options?.includeBody ?? false;
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
		const now = process.hrtime.bigint();
		state.requestStart = now;

		await this._loggingConnector.log(
			{
				level: "info",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: `===> ${request.method} ${request.url ? new URL(request.url).pathname : ""}`,
				data: this._includeBody ? request?.body : undefined
			},
			requestContext
		);
	}
}
