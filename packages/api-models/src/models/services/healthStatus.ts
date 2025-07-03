// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The health status of the component.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const HealthStatus = {
	/**
	 * OK.
	 */
	Ok: "ok",

	/**
	 * Warning.
	 */
	Warning: "warning",

	/**
	 * Error.
	 */
	Error: "error"
} as const;

/**
 * The health status of the component.
 */
export type HealthStatus = (typeof HealthStatus)[keyof typeof HealthStatus];
