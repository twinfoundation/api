// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHttpHeaders } from "@twin.org/web";
import type { IHttpRequestPathParams } from "./IHttpRequestPathParams";
import type { IHttpRequestQuery } from "./IHttpRequestQuery";

/**
 * Model for the standard parameters for an http request.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IHttpRequest<T = any> {
	/**
	 * Incoming Http Headers.
	 */
	headers?: IHttpHeaders;

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
