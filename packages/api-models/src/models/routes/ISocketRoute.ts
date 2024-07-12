// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IServiceRequestContext } from "@gtsc/services";
import type { IBaseRoute } from "./IBaseRoute";

/**
 * Interface which defines a socket route.
 */
export interface ISocketRoute extends IBaseRoute {
	/**
	 * The handler module.
	 */
	handler: (
		/**
		 * The request context.
		 */
		requestContext: IServiceRequestContext,

		/**
		 * The id of the socket the request is arriving on.
		 */
		socketId: string,

		/**
		 * The request object.
		 */
		request: unknown,

		/**
		 * Method to emit data on the socket.
		 */
		emitter: (topic: string, response?: unknown) => Promise<void>
	) => Promise<void>;
}
