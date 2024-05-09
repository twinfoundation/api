// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpStatusCodes, IHttpRequestHeaders } from "@gtsc/web";

/**
 * Model used when a REST route wants to return custom response.
 */
export interface IHttpResponse<T = unknown> {
	/**
	 * Alternative response status code.
	 */
	statusCode?: HttpStatusCodes;

	/**
	 * Additional response headers.
	 */
	headers?: IHttpRequestHeaders;

	/**
	 * Data to return as the main payload.
	 */
	data?: T;
}
