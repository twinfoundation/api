// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRouteProcessor } from "./IRestRouteProcessor";
import type { ISocketRouteProcessor } from "./ISocketRouteProcessor";
import type { IWebServerOptions } from "./IWebServerOptions";
import type { IRestRoute } from "../routes/IRestRoute";
import type { ISocketRoute } from "../routes/ISocketRoute";

/**
 * Interface describing a web server.
 */
export interface IWebServer<T> {
	/**
	 * Get the web server instance.
	 * @returns The web server instance.
	 */
	getInstance(): T;

	/**
	 * Build the server.
	 * @param restRouteProcessors The processors for incoming requests over REST.
	 * @param restRoutes The REST routes.
	 * @param socketRouteProcessors The processors for incoming requests over Sockets.
	 * @param socketRoutes The socket routes.
	 * @param options Options for building the server.
	 * @returns Nothing.
	 */
	build(
		restRouteProcessors?: IRestRouteProcessor[],
		restRoutes?: IRestRoute[],
		socketRouteProcessors?: ISocketRouteProcessor[],
		socketRoutes?: ISocketRoute[],
		options?: IWebServerOptions
	): Promise<void>;

	/**
	 * Start the server.
	 * @returns Nothing.
	 */
	start(): Promise<void>;

	/**
	 * Stop the server.
	 * @returns Nothing.
	 */
	stop(): Promise<void>;
}
