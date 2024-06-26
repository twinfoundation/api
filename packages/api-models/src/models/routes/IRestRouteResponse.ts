// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpStatusCodes, IHttpRequestHeaders } from "@gtsc/web";

/**
 * Interface which defines a REST route response.
 */
export interface IRestRouteResponse<T = unknown> {
	/**
	 * Response status code.
	 */
	statusCode?: HttpStatusCodes;

	/**
	 * Response headers.
	 */
	headers?: IHttpRequestHeaders;

	/**
	 * Data to return as the main payload.
	 */
	body?: T;

	/**
	 * Additional options that can be used to control the response.
	 */
	options?: {
		/**
		 * The content type to use in the response.
		 */
		mimeType?: string;

		/**
		 * The filename to use in content disposition.
		 */
		filename?: string;

		/**
		 * Whether to inline the content.
		 */
		inline?: boolean;
	};
}
