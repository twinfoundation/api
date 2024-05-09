// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHttpRequestQuery } from "./IHttpRequestQuery";

/**
 * Model for the standard parameters for an http request.
 */
export interface IHttpRequest<T = unknown> {
	/**
	 * The path parameters.
	 */
	path: { [id: string]: string | number | boolean };

	/**
	 * Request headers.
	 */
	query?: IHttpRequestQuery;

	/**
	 * Data to return as the main payload.
	 */
	data?: T;
}
