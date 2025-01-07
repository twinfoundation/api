// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRouteProcessorConfig } from "../models/IRouteProcessorConfig";

/**
 * Options for the RestRouteProcessor constructor.
 */
export interface IRestRouteProcessorConstructorOptions {
	/**
	 * The configuration for the processor.
	 */
	config?: IRouteProcessorConfig;
}
