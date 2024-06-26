// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { HttpMethods } from "@gtsc/web";

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
	methods?: HttpMethods[];

	/**
	 * The allowed headers.
	 * @default [ "X-Requested-With", "Access-Control-Allow-Origin", "X-HTTP-Method-Override", "Content-Type", "Content-Encoding", "Authorization", "Accept", "Accept-Encoding", "X-Api-Key" ]
	 */
	allowedHeaders?: string[];

	/**
	 * The exposed headers.
	 * @default ["Content-Disposition"]
	 */
	exposedHeaders?: string[];

	/**
	 * The allowed CORS domains.
	 * @default ["*"]
	 */
	corsOrigins?: string | string[];
}
