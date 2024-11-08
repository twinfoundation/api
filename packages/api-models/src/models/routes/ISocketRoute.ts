// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseRoute } from "./IBaseRoute";
import type { IHttpRequest } from "../protocol/IHttpRequest";
import type { IHttpRequestContext } from "../protocol/IHttpRequestContext";
import type { IHttpResponse } from "../protocol/IHttpResponse";

/**
 * Interface which defines a socket route.
 */
export interface ISocketRoute<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends IHttpRequest = any,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	U extends IHttpResponse = any
> extends IBaseRoute {
	/**
	 * The handler module.
	 */
	handler: (
		/**
		 * The request context.
		 */
		httpRequestContext: IHttpRequestContext,

		/**
		 * The request object.
		 */
		request: T,

		/**
		 * The function to emit a message.
		 */
		emit: (response: U) => Promise<void>
	) => void;
}
