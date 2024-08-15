// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRestClientConfig, IHttpRequest, IHttpResponse } from "@gtsc/api-models";
import { BaseError, Coerce, Guards, Is, StringHelper, type IKeyValue } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import { FetchError, FetchHelper, HttpMethod, HttpStatusCode, type IHttpHeaders } from "@gtsc/web";

/**
 * Abstract client class for common REST processing.
 */
export abstract class BaseRestClient {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME_CAMEL_CASE: string =
		StringHelper.camelCase(nameof<BaseRestClient>());

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
	private readonly _headers?: IHttpHeaders;

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
	 * @param route The route of the request.
	 * @param method The http method.
	 * @param request Request to send to the endpoint.
	 * @returns The response.
	 */
	public async fetch<T extends IHttpRequest, U extends IHttpResponse>(
		route: string,
		method: HttpMethod,
		request?: T
	): Promise<U> {
		Guards.stringValue(this._implementationName, nameof(route), route);
		Guards.arrayOneOf(this._implementationName, nameof(method), method, Object.values(HttpMethod));

		const routeParts = route.split("/");

		for (let i = 0; i < routeParts.length; i++) {
			if (routeParts[i].startsWith(":")) {
				const routeProp = routeParts[i].slice(1);
				const pathValue = request?.pathParams?.[routeProp];
				if (Is.notEmpty(pathValue)) {
					routeParts[i] = Coerce.string(pathValue) ?? "";
					delete request?.pathParams?.[routeProp];
				} else {
					throw new FetchError(
						this._implementationName,
						`${BaseRestClient._CLASS_NAME_CAMEL_CASE}.missingRouteProp`,
						HttpStatusCode.badRequest,
						{ route, routeProp }
					);
				}
			}
		}

		const queryKeyPairs: IKeyValue<string>[] = [];

		const isHttpRequest = Is.notEmpty(request);

		if (isHttpRequest) {
			const query = request?.query;
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
				delete request?.query;
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

		const body = isHttpRequest && request?.body ? JSON.stringify(request?.body) : undefined;

		let requestHeaders: IHttpHeaders = {};

		if (body) {
			requestHeaders["Content-Type"] = "application/json";
		}

		if (Is.object(this._headers)) {
			requestHeaders = { ...requestHeaders, ...this._headers };
		}

		const response = await FetchHelper.fetch(
			this._implementationName,
			this._endpointWithPrefix,
			finalRoute,
			method,
			body,
			{
				headers: requestHeaders,
				timeoutMs: this._timeout,
				includeCredentials: this._includeCredentials
			}
		);

		if (response.ok) {
			try {
				const httpResponse: IHttpResponse = {};

				const contentType = response.headers.get("content-type") ?? "";

				if (response.status !== HttpStatusCode.noContent) {
					if (/text\/plain/.test(contentType)) {
						httpResponse.body = await response.text();
					} else if (/application\/.*json/.test(contentType)) {
						httpResponse.body = await response.json();
					} else {
						httpResponse.body = new Uint8Array(await response.arrayBuffer());
						if (httpResponse.body.length === 0) {
							delete httpResponse.body;
						}
					}
				}

				const responseHeaders: IHttpHeaders = {};
				for (const header of response.headers.entries()) {
					responseHeaders[header[0]] = header[1];
				}

				if (Object.keys(responseHeaders).length > 0) {
					httpResponse.headers = responseHeaders;
				}

				if (response.status !== HttpStatusCode.ok) {
					httpResponse.statusCode = response.status as HttpStatusCode;
				}

				return httpResponse as U;
			} catch (err) {
				throw new FetchError(
					this._implementationName,
					`${BaseRestClient._CLASS_NAME_CAMEL_CASE}.decodingFailed`,
					response.status as HttpStatusCode,
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
			response.status >= HttpStatusCode.badRequest &&
			Is.object(errResponse) &&
			Is.stringValue(errResponse.message)
		) {
			err = BaseError.fromError(errResponse);
		}

		if (!err) {
			err = new FetchError(
				this._implementationName,
				`${BaseRestClient._CLASS_NAME_CAMEL_CASE}.failureStatusText`,
				response.status as HttpStatusCode,
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
