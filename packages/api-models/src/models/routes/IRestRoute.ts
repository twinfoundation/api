// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpMethods } from "@gtsc/web";
import type { IBaseRoute } from "./IBaseRoute";
import type { IHttpRequestContext } from "../protocol/IHttpRequestContext";

/**
 * Interface which defines a REST route.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IRestRoute<T = any, U = any> extends IBaseRoute {
	/**
	 * Summary of what task the operation performs.
	 */
	summary: string;

	/**
	 * Tag for the operation.
	 */
	tag: string;

	/**
	 * The http method.
	 */
	method: HttpMethods;

	/**
	 * The handler module.
	 */
	handler: (
		/**
		 * The request context.
		 */
		requestContext: IHttpRequestContext,

		/**
		 * The request object, combined query param, path params and body.
		 */
		request: T,

		/**
		 * Body as standalone if it's a data request.
		 */
		body?: unknown
	) => Promise<U>;

	/**
	 * The type of the request object.
	 */
	requestType?: {
		/**
		 * The object type for the request.
		 */
		type: string;

		/**
		 * Example objects for the request.
		 */
		examples?: { id: string; description?: string; request: T }[];
	};

	/**
	 * The type of the response object.
	 */
	responseType?: {
		/**
		 * The object type of the response.
		 */
		type: string;
		/**
		 * Example objects of the response.
		 */
		examples?: { id: string; description?: string; response: U }[];
	}[];

	/**
	 * The request can have alternative content mime types.
	 */
	requestContentType?: {
		mimeType: string;
		description: string;
	}[];

	/**
	 * The response can have alternative content mime types.
	 */
	responseContentType?: {
		mimeType: string;
		description: string;
	}[];
}
