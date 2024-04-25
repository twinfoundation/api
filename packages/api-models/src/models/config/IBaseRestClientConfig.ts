// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHttpRequestHeaders } from "@gtsc/web";

/**
 * Definition for the configuration of a rest client.
 */
export interface IBaseRestClientConfig {
	/**
	 * The endpoint where the api is hosted.
	 */
	endpoint: string;

	/**
	 * The prefix to the routes.
	 */
	pathPrefix?: string;

	/**
	 * The headers to include in requests.
	 */
	headers?: IHttpRequestHeaders;

	/**
	 * Timeout for requests in ms.
	 */
	timeout?: number;
}
