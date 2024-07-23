// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpResponse,
	IHttpRestRouteProcessor,
	IHttpServerRequest,
	IRestRoute
} from "@gtsc/api-models";
import { Coerce, Is } from "@gtsc/core";
import { LoggingConnectorFactory, type ILoggingConnector } from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import { HttpStatusCode } from "@gtsc/web";
import type { IResponseLoggingProcessorConfig } from "../models/IResponseLoggingProcessorConfig";

/**
 * Process the REST response and log its information.
 */
export class ResponseLoggingProcessor implements IHttpRestRouteProcessor {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<ResponseLoggingProcessor>();

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
	 * Create a new instance of ResponseLoggingProcessor.
	 * @param options Options for the processor.
	 * @param options.loggingConnectorType The type for the logging connector, defaults to "logging".
	 * @param options.config The configuration for the processor.
	 * @returns Promise that resolves when the processor is initialized.
	 */
	constructor(options?: {
		loggingConnectorType?: string;
		config?: IResponseLoggingProcessorConfig;
	}) {
		this._loggingConnector = LoggingConnectorFactory.get(
			options?.loggingConnectorType ?? "logging"
		);
		this._includeBody = options?.config?.includeBody ?? false;
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
		let data;
		if (this._includeBody) {
			const contentType = response.headers?.["Content-Type"];
			const isJson = contentType?.includes("application/json; charset=utf-8");
			const contentLength = response.headers?.["Content-Length"];
			if (isJson) {
				data = JSON.stringify(response.body);
			} else {
				const dataParts = [];
				if (Is.stringValue(contentType)) {
					dataParts.push(`Content Type: ${contentType}`);
				}
				if (Is.stringValue(contentType)) {
					dataParts.push(`Content Length: ${contentLength}`);
				}
				data = dataParts.join(", ");
			}
		}
		const now = process.hrtime.bigint();
		const start = Coerce.bigint(state.requestStart) ?? now;
		const elapsed = now - start;
		const elapsedMicroSeconds = Math.floor(Number(elapsed) / 1000);
		await this._loggingConnector.log(
			{
				level:
					Is.number(response.statusCode) && response.statusCode >= HttpStatusCode.badRequest
						? "error"
						: "info",
				source: this.CLASS_NAME,
				ts: Date.now(),
				message: `<=== ${response.statusCode ?? ""} ${request.method} ${request.url ? new URL(request.url).pathname : ""} duration: ${elapsedMicroSeconds}µs`,
				data
			},
			requestContext
		);
	}
}
