// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IStaticUserIdentityProcessorConfig } from "./IStaticUserIdentityProcessorConfig";

/**
 * Options for the StaticUserIdentityProcessor constructor.
 */
export interface IStaticUserIdentityProcessorConstructorOptions {
	/**
	 * The configuration for the processor.
	 */
	config: IStaticUserIdentityProcessorConfig;
}
