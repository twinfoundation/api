// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHttpRequestIdentity } from "./IHttpRequestIdentity";
import type { IHttpServerRequest } from "./IHttpServerRequest";

/**
 * Context data from the HTTP request.
 */
export interface IHttpRequestContext extends IHttpRequestIdentity {
	/**
	 * The raw HTTP request.
	 */
	serverRequest: IHttpServerRequest;

	/**
	 * The state handed through the processors.
	 */
	processorState: { [id: string]: unknown };
}
