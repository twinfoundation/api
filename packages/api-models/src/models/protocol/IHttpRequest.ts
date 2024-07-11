// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpMethods, IHttpRequestHeaders } from "@gtsc/web";
import type { IHttpRequestPathParams } from "./IHttpRequestPathParams";
import type { IHttpRequestQuery } from "./IHttpRequestQuery";

/**
 * Model for the standard parameters for an http request.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IHttpRequest<T = any> {
	/**
	 * The request method.
	 */
	method?: HttpMethods;

	/**
	 * The request url.
	 */
	url?: string;

	/**
	 * Incoming Http Headers.
	 */
	headers?: IHttpRequestHeaders;

	/**
	 * The path parameters.
	 */
	pathParams?: IHttpRequestPathParams;

	/**
	 * The query parameters.
	 */
	query?: IHttpRequestQuery;

	/**
	 * Data to return send as the body.
	 */
	body?: T;
}
