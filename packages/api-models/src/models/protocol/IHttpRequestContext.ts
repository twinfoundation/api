// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRequestContext } from "@gtsc/services";
import type { IHttpRequestHeaders } from "@gtsc/web";

/**
 * Context data from the HTTP request.
 */
export interface IHttpRequestContext extends IRequestContext {
	/**
	 * The url in the request.
	 */
	url: URL;

	/**
	 * The headers included with the request.
	 * @internal
	 */
	headers: IHttpRequestHeaders;
}
