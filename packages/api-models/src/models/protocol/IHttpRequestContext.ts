// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IServiceRequestContext } from "@gtsc/services";
import type { IHttpServerRequest } from "./IHttpServerRequest";

/**
 * Context data from the HTTP request.
 */
export interface IHttpRequestContext extends IServiceRequestContext {
	/**
	 * The raw HTTP request.
	 */
	serverRequest: IHttpServerRequest;
}
