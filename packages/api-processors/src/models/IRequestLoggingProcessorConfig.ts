// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Configuration for the request logging processor.
 */
export interface IRequestLoggingProcessorConfig {
	/**
	 * Include the body objects when logging the information.
	 */
	includeBody?: boolean;
}
