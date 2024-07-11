// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpStatusCodes, IHttpRequestHeaders } from "@gtsc/web";

/**
 * Model for the standard parameters for an http response.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IHttpResponse<T = any> {
	/**
	 * Response status code.
	 */
	statusCode?: HttpStatusCodes;

	/**
	 * Response headers.
	 */
	headers?: IHttpRequestHeaders;

	/**
	 * Data to return as the main payload.
	 */
	body?: T;
}
