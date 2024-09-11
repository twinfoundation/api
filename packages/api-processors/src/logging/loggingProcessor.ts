// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IHttpRequestIdentity,
	IHttpResponse,
	IHttpRestRouteProcessor,
	IHttpServerRequest,
	IRestRoute
} from "@gtsc/api-models";
import { Coerce, Is } from "@gtsc/core";
import { LoggingConnectorFactory, type ILoggingConnector } from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";
import { HeaderTypes, HttpStatusCode, MimeTypes } from "@gtsc/web";
import type { IRequestLoggingProcessorConfig } from "../models/IRequestLoggingProcessorConfig";

/**
 * Process the REST request and log its information.
 */
export class LoggingProcessor implements IHttpRestRouteProcessor {
	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<LoggingProcessor>();

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
	 * @param options.config The configuration for the processor.
	 * @returns Promise that resolves when the processor is initialized.
	 */
	constructor(options?: {
		loggingConnectorType?: string;
		config?: IRequestLoggingProcessorConfig;
	}) {
		this._loggingConnector = LoggingConnectorFactory.get(
			options?.loggingConnectorType ?? "logging"
		);
		this._includeBody = options?.config?.includeBody ?? false;
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
		route: IRestRoute | undefined,
		requestIdentity: IHttpRequestIdentity,
		processorState: { [id: string]: unknown }
	): Promise<void> {
		const now = process.hrtime.bigint();
		processorState.requestStart = now;

		await this._loggingConnector.log({
			level: "info",
			source: this.CLASS_NAME,
			ts: Date.now(),
			message: `===> ${request.method} ${request.url ? new URL(request.url).pathname : ""}`,
			data: this._includeBody ? request?.body : undefined
		});
	}

	/**
	 * Post process the REST request for the specified route.
	 * @param request The incoming request.
	 * @param response The outgoing response.
	 * @param route The route to process.
	 * @param requestIdentity The identity context for the request.
	 * @param processorState The state handed through the processors.
	 */
	public async post(
		request: IHttpServerRequest,
		response: IHttpResponse,
		route: IRestRoute | undefined,
		requestIdentity: IHttpRequestIdentity,
		processorState: { [id: string]: unknown }
	): Promise<void> {
		let data: { [id: string]: unknown } | undefined;
		if (this._includeBody) {
			const contentType = response.headers?.[HeaderTypes.ContentType];
			const isJson = contentType?.includes(`${MimeTypes.Json}; charset=utf-8`);
			const contentLength = response.headers?.[HeaderTypes.ContentLength];
			if (isJson) {
				data = {
					body: response.body
				};
			} else {
				const dataParts: { [id: string]: string } = {};
				if (Is.stringValue(contentType)) {
					dataParts["Content Type"] = contentType;
				}
				if (Is.stringValue(contentLength)) {
					dataParts["Content Length"] = contentLength;
				}
				if (Object.keys(dataParts).length > 0) {
					data = {
						headers: dataParts
					};
				}
			}
		}
		const now = process.hrtime.bigint();
		const start = Coerce.bigint(processorState.requestStart) ?? now;
		const elapsed = now - start;
		const elapsedMicroSeconds = Math.floor(Number(elapsed) / 1000);
		await this._loggingConnector.log({
			level:
				Is.number(response.statusCode) && response.statusCode >= HttpStatusCode.badRequest
					? "error"
					: "info",
			source: this.CLASS_NAME,
			ts: Date.now(),
			message: `<=== ${response.statusCode ?? ""} ${request.method} ${request.url ? new URL(request.url).pathname : ""} duration: ${elapsedMicroSeconds}µs`,
			data
		});
	}
}
