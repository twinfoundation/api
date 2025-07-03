// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IMimeTypeProcessor } from "@twin.org/api-models";
import type { IFastifyWebServerConfig } from "./IFastifyWebServerConfig";

/**
 * The options for the Fastify web server constructor.
 */
export interface IFastifyWebServerConstructorOptions {
	/**
	 * The type of the logging connector to use, if undefined, no logging will happen.
	 */
	loggingConnectorType?: string;

	/**
	 * Additional configuration for the server.
	 */
	config?: IFastifyWebServerConfig;

	/**
	 * Additional MIME type processors.
	 */
	mimeTypeProcessors?: IMimeTypeProcessor[];
}
