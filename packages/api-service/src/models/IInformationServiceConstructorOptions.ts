// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IInformationServiceConfig } from "./IInformationServiceConfig";

/**
 * Options for the InformationService constructor.
 */
export interface IInformationServiceConstructorOptions {
	/**
	 * The configuration for the service.
	 */
	config: IInformationServiceConfig;
}
