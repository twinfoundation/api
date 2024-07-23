// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Configuration for the api key partition processor.
 */
export interface IApiKeyPartitionProcessorConfig {
	/**
	 * The name of the header to look for the API key.
	 * @default x-api-key
	 */
	headerName?: string;
}
