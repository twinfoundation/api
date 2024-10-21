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

	/**
	 * Show the full base64 content for data, default to abbreviate.
	 */
	fullBase64?: boolean;

	/**
	 * List of property names to obfuscate, can be regex, defaults to "password".
	 */
	obfuscateProperties?: string[];
}
