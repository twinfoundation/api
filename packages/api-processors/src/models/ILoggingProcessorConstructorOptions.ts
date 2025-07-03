// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { ILoggingProcessorConfig } from "./ILoggingProcessorConfig";

/**
 * Options for the LoggingProcessor constructor.
 */
export interface ILoggingProcessorConstructorOptions {
	/**
	 * The type for the logging connector.
	 * @default logging
	 */
	loggingConnectorType?: string;

	/**
	 *
	 */
	config?: ILoggingProcessorConfig;
}
