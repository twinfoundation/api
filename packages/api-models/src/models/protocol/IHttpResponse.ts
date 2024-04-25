// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpStatusCodes } from "@gtsc/web";
import type { IHttpRequestQuery } from "./IHttpRequestQuery";

/**
 * Model used when a REST route wants to return custom response.
 */
export interface IHttpResponse {
	/**
	 * Alternative response status code.
	 */
	statusCode?: HttpStatusCodes;

	/**
	 * Additional response headers.
	 */
	headers?: IHttpRequestQuery;

	/**
	 * Additional options.
	 */
	options?: { [id: string]: string | number | boolean };

	/**
	 * Data to return as the main payload.
	 */
	data?: unknown;
}
