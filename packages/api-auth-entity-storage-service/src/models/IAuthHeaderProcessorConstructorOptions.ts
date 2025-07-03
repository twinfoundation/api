// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IAuthHeaderProcessorConfig } from "./IAuthHeaderProcessorConfig";

/**
 * Options for the AuthHeaderProcessor constructor.
 */
export interface IAuthHeaderProcessorConstructorOptions {
	/**
	 * The vault for the private keys.
	 * @default vault
	 */
	vaultConnectorType?: string;

	/**
	 * The configuration for the processor.
	 */
	config?: IAuthHeaderProcessorConfig;
}
