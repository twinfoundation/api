// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	IBaseRoute,
	IBaseRouteProcessor,
	IHttpRequestIdentity,
	IHttpResponse,
	IHttpServerRequest
} from "@twin.org/api-models";
import { Coerce, Is, ObjectHelper } from "@twin.org/core";
import { LoggingConnectorFactory, type ILoggingConnector } from "@twin.org/logging-models";
import { nameof } from "@twin.org/nameof";
import { HeaderTypes, HttpStatusCode, MimeTypes } from "@twin.org/web";
import type { ILoggingProcessorConfig } from "../models/ILoggingProcessorConfig";

/**
 * Process the REST request and log its information.
 */
export class LoggingProcessor implements IBaseRouteProcessor {
	/**
	 * The namespace supported by the processor.
	 */
	public static readonly NAMESPACE: string = "logging";

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
	 * Show the full base64 content for data, default to abbreviate.
	 * @internal
	 */
	private readonly _fullBase64: boolean;

	/**
	 * List of property names to obfuscate, defaults to "password".
	 * @internal
	 */
	private readonly _obfuscateProperties: string[];

	/**
	 * Create a new instance of RequestLoggingProcessor.
	 * @param options Options for the processor.
	 * @param options.loggingConnectorType The type for the logging connector, defaults to "logging".
	 * @param options.config The configuration for the processor.
	 * @returns Promise that resolves when the processor is initialized.
	 */
	constructor(options?: { loggingConnectorType?: string; config?: ILoggingProcessorConfig }) {
		this._loggingConnector = LoggingConnectorFactory.get(
			options?.loggingConnectorType ?? "logging"
		);
		this._includeBody = options?.config?.includeBody ?? false;
		this._fullBase64 = options?.config?.fullBase64 ?? false;
		this._obfuscateProperties = options?.config?.obfuscateProperties ?? ["password"];
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
		const now = process.hrtime.bigint();
		processorState.requestStart = now;

		const contentType = request.headers?.[HeaderTypes.ContentType];
		const isJson = Is.stringValue(contentType)
			? contentType.includes(MimeTypes.Json) || contentType.includes(MimeTypes.JsonLd)
			: false;

		let requestUrl = "";
		if (Is.stringValue(request.url)) {
			// Socket paths do not have a prefix so just use the whole url.
			if (request.url.startsWith("http")) {
				requestUrl = new URL(request.url).pathname;
			} else {
				requestUrl = request.url;
			}
		}

		await this._loggingConnector.log({
			level: "info",
			source: this.CLASS_NAME,
			ts: Date.now(),
			message: `===> ${request.method} ${requestUrl}`,
			data:
				this._includeBody && isJson
					? (this.processJson("body", ObjectHelper.clone(request?.body)) as {
							[key: string]: unknown;
						})
					: undefined
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
		route: IBaseRoute | undefined,
		requestIdentity: IHttpRequestIdentity,
		processorState: { [id: string]: unknown }
	): Promise<void> {
		let data: { [id: string]: unknown } | undefined;
		if (this._includeBody) {
			const contentType = response.headers?.[HeaderTypes.ContentType];
			const isJson = Is.stringValue(contentType)
				? contentType.includes(MimeTypes.Json) || contentType.includes(MimeTypes.JsonLd)
				: false;
			const contentLength = response.headers?.[HeaderTypes.ContentLength];
			if (isJson) {
				data = {
					body: this.processJson("body", ObjectHelper.clone(response.body))
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

		let requestUrl = "";
		if (Is.stringValue(request.url)) {
			// Socket paths do not have a prefix so just use the whole url.
			if (request.url.startsWith("http")) {
				requestUrl = new URL(request.url).pathname;
			} else {
				requestUrl = request.url;
			}
		}

		await this._loggingConnector.log({
			level:
				Is.number(response.statusCode) && response.statusCode >= HttpStatusCode.badRequest
					? "error"
					: "info",
			source: this.CLASS_NAME,
			ts: Date.now(),
			message: `<=== ${response.statusCode ?? ""} ${request.method} ${requestUrl} duration: ${elapsedMicroSeconds}µs`,
			data
		});
	}

	/**
	 * Process the JSON.
	 * @param propValue The property to process.
	 * @returns The processed property.
	 * @internal
	 */
	private processJson(propName: string, propValue: unknown): unknown {
		if (Is.array(propValue)) {
			for (let i = 0; i < propValue.length; i++) {
				propValue[i] = this.processJson(`${i}`, propValue[i]);
			}
		} else if (Is.object(propValue)) {
			for (const key of Object.keys(propValue)) {
				propValue[key] = this.processJson(key, propValue[key]);
			}
		} else if (!this._fullBase64 && Is.stringBase64(propValue) && propValue.length > 256) {
			propValue = "<base64>";
		} else if (
			Is.string(propValue) &&
			this._obfuscateProperties.some(op => new RegExp(op).test(propName))
		) {
			propValue = "**************";
		}

		return propValue;
	}
}
