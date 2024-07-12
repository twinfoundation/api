// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IServiceRequestContext } from "@gtsc/services";
import type { IHttpRequest } from "./IHttpRequest";

/**
 * Context data from the HTTP request.
 */
export interface IHttpRequestContext extends IServiceRequestContext {
	/**
	 * The raw HTTP request.
	 */
	rawRequest: IHttpRequest;
}
