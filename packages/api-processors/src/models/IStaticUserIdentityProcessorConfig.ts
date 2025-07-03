// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Configuration for the static identity processor.
 */
export interface IStaticUserIdentityProcessorConfig {
	/**
	 * The fixed user identity for request context.
	 */
	userIdentity: string;
}
