// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * The definition for a handler for a specific MIME type.
 */
export interface IMimeTypeProcessor {
	/**
	 * Get the MIME types that this handler can handle.
	 * @returns The MIME types that this handler can handle.
	 */
	getTypes(): string[];

	/**
	 * Handle content.
	 * @param body The body to process.
	 * @returns The processed body.
	 */
	handle(body: Uint8Array): Promise<unknown>;
}
