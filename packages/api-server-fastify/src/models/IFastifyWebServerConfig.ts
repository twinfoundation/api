// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { FastifyServerOptions } from "fastify";
import type { ServerOptions } from "socket.io";

/**
 * The configuration for the Fastify web server.
 */
export interface IFastifyWebServerConfig {
	/**
	 * The web server options.
	 */
	web?: Partial<FastifyServerOptions>;

	/**
	 * The socket server options.
	 */
	socket?: Partial<ServerOptions>;

	/**
	 * Include the stack with errors.
	 */
	includeErrorStack?: boolean;
}
