// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { BaseError, Guards, Is, StringHelper, type IKeyValue } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IRequestContext } from "@gtsc/services";
import {
	FetchError,
	FetchHelper,
	HttpStatusCodes,
	type HttpMethods,
	type IHttpRequestHeaders
} from "@gtsc/web";
import type { IBaseRestClientConfig } from "../models/config/IBaseRestClientConfig";
import type { IHttpRequest } from "../models/protocol/IHttpRequest";

/**
 * Abstract client class for common REST processing.
 */
export abstract class BaseRestClient {
	/**
	 * The name of the class implementation REST calls.
	 * @internal
	 */
	private readonly _implementationName: string;

	/**
	 * The endpoint with prefix to send the requests to.
	 * @internal
	 */
	private readonly _endpointWithPrefix: string;

	/**
	 * The headers to include in requests.
	 * @internal
	 */
	private readonly _headers?: IHttpRequestHeaders;

	/**
	 * Timeout for requests in ms.
	 * @internal
	 */
	private readonly _timeout?: number;

	/**
	 * Create a new instance of BaseRestClient.
	 * @param implementationName The name of the class implementation REST calls.
	 * @param config The configuration for the client.
	 * @param pathPrefix The default prefix to use if none in configuration.
	 */
	constructor(implementationName: string, config: IBaseRestClientConfig, pathPrefix: string) {
		Guards.stringValue(implementationName, nameof(implementationName), implementationName);
		Guards.object<IBaseRestClientConfig>(implementationName, nameof(config), config);
		Guards.stringValue(implementationName, nameof(config.endpoint), config.endpoint);

		this._headers = config.headers;
		this._timeout = config.timeout;

		this._implementationName = implementationName;
		this._endpointWithPrefix = StringHelper.trimTrailingSlashes(config.endpoint);

		const finalPathPrefix = config.pathPrefix ?? pathPrefix;
		if (Is.stringValue(finalPathPrefix)) {
			this._endpointWithPrefix += `/${finalPathPrefix}`;
		}
	}

	/**
	 * Get the endpoint with the prefix for the namespace.
	 * @returns The endpoint with namespace prefix attached.
	 */
	public getEndpointWithPrefix(): string {
		return this._endpointWithPrefix;
	}

	/**
	 * Perform a request in json format.
	 * @param requestContext The context for the request.
	 * @param route The route of the request.
	 * @param method The http method.
	 * @param requestData Request to send to the endpoint.
	 * @returns The response.
	 */
	public async fetch<T, U>(
		requestContext: IRequestContext,
		route: string,
		method: HttpMethods,
		requestData?: T
	): Promise<U> {
		const routeParts = route.split("/");

		for (let i = 0; i < routeParts.length; i++) {
			if (routeParts[i].startsWith(":")) {
				const routeProp = routeParts[i].slice(1) as keyof T;
				if (requestData?.[routeProp]) {
					const propValue = requestData[routeProp];
					if (Is.stringValue(propValue) || Is.number(propValue) || Is.boolean(propValue)) {
						routeParts[i] = propValue.toString();
						delete requestData[routeProp];
					}
				} else {
					throw new FetchError(
						this._implementationName,
						"missingRouteProp",
						HttpStatusCodes.BAD_REQUEST,
						{ route, routeProp }
					);
				}
			}
		}

		const queryKeyPairs: IKeyValue<string>[] = [];

		const isHttpRequest = Is.object<IHttpRequest>(requestData);

		if (isHttpRequest) {
			const query = requestData?.query;
			if (Is.object(query)) {
				for (const qp in query) {
					const propValue = query[qp];
					if (Is.stringValue(propValue) || Is.number(propValue) || Is.boolean(propValue)) {
						queryKeyPairs.push({
							key: qp,
							value: propValue.toString()
						});
					}
				}
				delete requestData?.query;
			}
		}

		let finalRoute = routeParts.join("/");
		if (finalRoute === "/") {
			finalRoute = "";
		}
		if (queryKeyPairs.length > 0) {
			finalRoute += `?${queryKeyPairs
				.map(qp => `${encodeURIComponent(qp.key)}=${encodeURIComponent(qp.value)}`)
				.join("&")}`;
		}

		const payload =
			isHttpRequest && requestData?.data ? JSON.stringify(requestData?.data) : undefined;

		let headers: IHttpRequestHeaders = {};

		if (payload) {
			headers["Content-Type"] = "application/json";
		}

		if (Is.object(this._headers)) {
			headers = { ...headers, ...this._headers };
		}

		const locale = requestContext.locale;
		if (Is.stringValue(locale)) {
			headers["Accept-Language"] = locale;
		}

		const response = await FetchHelper.fetch(
			this._implementationName,
			this._endpointWithPrefix,
			finalRoute,
			method,
			payload,
			{ headers, timeoutMs: this._timeout, includeCredentials: true }
		);

		if (response.ok) {
			if (response.status === HttpStatusCodes.NO_CONTENT) {
				return {} as U;
			}
			try {
				const data = await response.json();
				return { data } as unknown as U;
			} catch (err) {
				throw new FetchError(
					this._implementationName,
					"decodingFailed",
					response.status,
					{
						route
					},
					err
				);
			}
		}

		const errResponse = await response.json();
		let err: BaseError | undefined;
		if (
			response.status >= HttpStatusCodes.BAD_REQUEST &&
			response.status < HttpStatusCodes.INTERNAL_SERVER_ERROR &&
			Is.object(errResponse) &&
			Is.stringValue(errResponse.message)
		) {
			err = BaseError.fromError(errResponse);
		}

		if (!err) {
			err = new FetchError(this._implementationName, "failureStatusText", response.status, {
				statusText: response.statusText ?? response.status,
				route: finalRoute,
				response: errResponse
			});
		}

		throw err;
	}
}
