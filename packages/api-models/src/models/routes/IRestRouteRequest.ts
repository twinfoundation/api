// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHttpRequestQuery } from "../protocol/IHttpRequestQuery";

/**
 * Interface which defines a REST route request.
 */
export interface IRestRouteRequest<T = unknown> {
	/**
	 * The path parameters.
	 */
	path?: { [id: string]: string | number | boolean };

	/**
	 * The query parameters.
	 */
	query?: IHttpRequestQuery;

	/**
	 * Data to return send as the body.
	 */
	body?: T;
}
