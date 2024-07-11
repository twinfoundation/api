// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpMethods } from "@gtsc/web";
import type { IBaseRoute } from "./IBaseRoute";
import type { IRestRouteResponseOptions } from "./IRestRouteResponseOptions";
import type { IHttpRequest } from "../protocol/IHttpRequest";
import type { IHttpRequestContext } from "../protocol/IHttpRequestContext";
import type { IHttpResponse } from "../protocol/IHttpResponse";

/**
 * Interface which defines a REST route.
 */
export interface IRestRoute<
	T extends IHttpRequest = IHttpRequest,
	U extends IHttpResponse & IRestRouteResponseOptions = IHttpResponse & IRestRouteResponseOptions
> extends IBaseRoute {
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
		request: T | never
	) => Promise<U | never>;

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

	/**
	 * Exclude the route from being included in the spec file.
	 */
	excludeFromSpec?: boolean;
}
