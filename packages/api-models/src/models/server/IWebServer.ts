// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHttpRestRouteProcessor } from "./IHttpRestRouteProcessor";
import type { IWebServerOptions } from "./IWebServerOptions";
import type { IRestRoute } from "../routes/IRestRoute";

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
	 * @param restRouteProcessors The hooks to process the incoming requests.
	 * @param restRoutes The REST routes.
	 * @param options Options for building the server.
	 * @returns Nothing.
	 */
	build(
		restRouteProcessors: IHttpRestRouteProcessor[],
		restRoutes: IRestRoute[],
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
