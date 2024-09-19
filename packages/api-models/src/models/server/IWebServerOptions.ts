// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpMethod } from "@twin.org/web";

/**
 * Options for the web server.
 */
export interface IWebServerOptions {
	/**
	 * The port to bind the web server to.
	 * @default 3000
	 */
	port?: number;

	/**
	 * The address to bind the web server to.
	 * @default localhost
	 */
	host?: string;

	/**
	 * The methods that the server accepts.
	 * @default ["GET", "PUT", "POST", "DELETE", "OPTIONS"]
	 */
	methods?: HttpMethod[];

	/**
	 * Any additional allowed headers.
	 */
	allowedHeaders?: string[];

	/**
	 * And additional exposed headers.
	 */
	exposedHeaders?: string[];

	/**
	 * The allowed CORS domains.
	 * @default ["*"]
	 */
	corsOrigins?: string | string[];
}
