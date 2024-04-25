// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHttpRequestQuery } from "./IHttpRequestQuery";

/**
 * Model used when a REST route wants to return custom response.
 */
export interface IHttpRequest {
	/**
	 * The path parameters.
	 */
	[id: string]: unknown;

	/**
	 * The raw url.
	 */
	rawUrl: URL;

	/**
	 * Request headers.
	 */
	query?: IHttpRequestQuery;

	/**
	 * Data to return as the main payload.
	 */
	data?: unknown;
}
