// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHttpRequest } from "../protocol/IHttpRequest";

/**
 * A REST request with no input parameters.
 */
export interface INoContentRequest extends IHttpRequest {
	/**
	 * Incoming Http Headers.
	 */
	headers?: never;

	/**
	 * The path parameters.
	 */
	pathParams?: never;

	/**
	 * The query parameters.
	 */
	query?: never;

	/**
	 * Data to return send as the body.
	 */
	body?: never;
}
