// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHttpHeaders } from "@twin.org/web";

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
	headers?: IHttpHeaders;

	/**
	 * Timeout for requests in ms.
	 */
	timeout?: number;

	/**
	 * Include credentials in the request, defaults to true.
	 */
	includeCredentials?: boolean;
}
