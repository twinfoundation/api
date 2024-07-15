// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpMethod } from "@gtsc/web";
import type { IHttpRequest } from "./IHttpRequest";

/**
 * Model for the standard parameters for an http request.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IHttpServerRequest<T = any> extends IHttpRequest<T> {
	/**
	 * The request method.
	 */
	method?: HttpMethod;

	/**
	 * The request url.
	 */
	url?: string;
}
