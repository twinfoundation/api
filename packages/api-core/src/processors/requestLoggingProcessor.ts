// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type {
	HttpRestRouteProcessor,
	IHttpRequest,
	IHttpResponse,
	IRestRoute
} from "@gtsc/api-models";
import { Is } from "@gtsc/core";
import { LoggingConnectorFactory, type ILoggingConnector } from "@gtsc/logging-models";
import type { IServiceRequestContext } from "@gtsc/services";

let loggingConnector: ILoggingConnector | undefined;

/**
 * Process the REST request and log its information.
 * @param request The incoming request.
 * @param response The outgoing response.
 * @param route The route to process.
 * @param requestContext The context for the request.
 * @param state The state for the request.
 * @param state.requestStart The timestamp when the request was started.
 * @param options Additional options for the processing.
 * @param options.includeBody Include the body objects when logging the information.
 */
export const requestLoggingProcessor: HttpRestRouteProcessor<
	{ includeBody?: boolean } | undefined
> = async (
	request: IHttpRequest,
	response: IHttpResponse,
	route: IRestRoute | undefined,
	requestContext: IServiceRequestContext,
	state: { [id: string]: unknown; requestStart?: bigint },
	options?: { includeBody?: boolean }
) => {
	const now = process.hrtime.bigint();
	state.requestStart = now;

	if (Is.undefined(loggingConnector)) {
		loggingConnector = LoggingConnectorFactory.get("logging");
	}
	if (!Is.undefined(loggingConnector)) {
		await loggingConnector.log(
			{
				level: "info",
				source: "restRequestLoggingHandler",
				ts: Date.now(),
				message: `===> ${request.method} ${request.url ? new URL(request.url).pathname : ""}`,
				data: options?.includeBody ? request?.body : undefined
			},
			requestContext
		);
	}
};
