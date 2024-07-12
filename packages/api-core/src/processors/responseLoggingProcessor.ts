// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	HttpRestRouteProcessor,
	IHttpRequest,
	IHttpResponse,
	IRestRoute
} from "@gtsc/api-models";
import { Coerce, Is } from "@gtsc/core";
import { LoggingConnectorFactory, type ILoggingConnector } from "@gtsc/logging-models";
import type { IServiceRequestContext } from "@gtsc/services";
import { HttpStatusCodes } from "@gtsc/web";

let loggingConnector: ILoggingConnector | undefined;

/**
 * Process the REST response and log its information.
 * @param request The incoming request.
 * @param response The outgoing response.
 * @param route The route to process.
 * @param requestContext The context for the request.
 * @param state The state for the request.
 * @param state.requestStart The timestamp when the request was started.
 * @param options Additional options for the processing.
 * @param options.includeBody Include the body objects when logging the information.
 */
export const responseLoggingProcessor: HttpRestRouteProcessor<
	{ includeBody?: boolean } | undefined
> = async (
	request: IHttpRequest,
	response: IHttpResponse,
	route: IRestRoute | undefined,
	requestContext: IServiceRequestContext,
	state: { [id: string]: unknown; requestStart?: bigint },
	options?: { includeBody?: boolean }
) => {
	if (Is.undefined(loggingConnector)) {
		loggingConnector = LoggingConnectorFactory.get("logging");
	}
	if (!Is.undefined(loggingConnector)) {
		let data;
		if (options?.includeBody) {
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
				dataParts.push(`Content Length: ${contentLength}`);
				data = dataParts.join(", ");
			}
		}
		const now = process.hrtime.bigint();
		const start = Coerce.bigint(state.requestStart) ?? now;
		const elapsed = now - start;
		const elapsedMicroSeconds = Math.floor(Number(elapsed) / 1000);
		await loggingConnector.log(
			{
				level:
					Is.number(response.statusCode) && response.statusCode >= HttpStatusCodes.BAD_REQUEST
						? "error"
						: "info",
				source: "restResponseLoggingHandler",
				ts: Date.now(),
				message: `<=== ${response.statusCode} ${request.method} ${request.url ? new URL(request.url).pathname : ""} duration: ${elapsedMicroSeconds}µs`,
				data
			},
			requestContext
		);
	}
};
