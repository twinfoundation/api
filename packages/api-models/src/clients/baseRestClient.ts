// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import { BaseError, Coerce, Guards, Is, StringHelper, type IKeyValue } from "@gtsc/core";
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
import type { IHttpResponse } from "../models/protocol/IHttpResponse";

/**
 * Abstract client class for common REST processing.
 */
export abstract class BaseRestClient {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<BaseRestClient>();

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
	 * Include credentials in the request, defaults to true.
	 */
	private readonly _includeCredentials: boolean;

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
		this._includeCredentials = config.includeCredentials ?? true;

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
	public async fetch<T extends IHttpRequest, U extends IHttpResponse>(
		requestContext: IRequestContext,
		route: string,
		method: HttpMethods,
		requestData?: T
	): Promise<U> {
		Guards.object<IRequestContext>(
			this._implementationName,
			nameof(requestContext),
			requestContext
		);
		Guards.stringValue(this._implementationName, nameof(route), route);
		Guards.arrayOneOf(this._implementationName, nameof(method), method, [
			"GET",
			"POST",
			"PUT",
			"DELETE",
			"PATCH",
			"OPTIONS",
			"HEAD",
			"TRACE",
			"CONNECT"
		]);

		const routeParts = route.split("/");

		for (let i = 0; i < routeParts.length; i++) {
			if (routeParts[i].startsWith(":")) {
				const routeProp = routeParts[i].slice(1);
				const pathValue = requestData?.path?.[routeProp];
				if (Is.notEmpty(pathValue)) {
					routeParts[i] = Coerce.string(pathValue) ?? "";
					delete requestData?.path?.[routeProp];
				} else {
					throw new FetchError(
						this._implementationName,
						`${BaseRestClient._CLASS_NAME}.missingRouteProp`,
						HttpStatusCodes.BAD_REQUEST,
						{ route, routeProp }
					);
				}
			}
		}

		const queryKeyPairs: IKeyValue<string>[] = [];

		const isHttpRequest = Is.notEmpty(requestData);

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
		headers["Accept-Language"] = Is.stringValue(locale) ? locale : "en";

		const response = await FetchHelper.fetch(
			this._implementationName,
			this._endpointWithPrefix,
			finalRoute,
			method,
			payload,
			{ headers, timeoutMs: this._timeout, includeCredentials: this._includeCredentials }
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
					`${BaseRestClient._CLASS_NAME}.decodingFailed`,
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
			err = new FetchError(
				this._implementationName,
				`${BaseRestClient._CLASS_NAME}.failureStatusText`,
				response.status,
				{
					statusText: response.statusText ?? response.status,
					route: finalRoute,
					response: errResponse
				}
			);
		}

		throw err;
	}
}
