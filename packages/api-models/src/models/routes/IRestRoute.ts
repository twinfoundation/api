// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRequestContext } from "@gtsc/services";
import type { HttpMethods, HttpStatusCodes } from "@gtsc/web";
import type { IBaseRoute } from "./IBaseRoute";

/**
 * Interface which defines a REST route.
 */
export interface IRestRoute extends IBaseRoute {
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
		requestContext: IRequestContext,

		/**
		 * The request object, combined query param, path params and body.
		 */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		request: any,

		/**
		 * Body as standalone if it's a data request.
		 */
		body?: unknown
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	) => Promise<any>;

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
		examples?: unknown[];
	};

	/**
	 * The type of the response object.
	 */
	responseType?: {
		/**
		 * The status code of the response.
		 */
		statusCode: HttpStatusCodes;
		/**
		 * The object type of the response.
		 */
		type: string;
		/**
		 * Example objects of the response.
		 */
		examples?: unknown[];
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
