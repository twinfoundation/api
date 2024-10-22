// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IMimeTypeProcessor } from "@twin.org/api-models";
import { Converter } from "@twin.org/core";
import { MimeTypes } from "@twin.org/web";

/**
 * Process the REST request and log its information.
 */
export class JwtMimeTypeProcessor implements IMimeTypeProcessor {
	/**
	 * Get the MIME types that this handler can handle.
	 * @returns The MIME types that this handler can handle.
	 */
	public getTypes(): string[] {
		return [MimeTypes.Jwt];
	}

	/**
	 * Handle content.
	 * @param body The body to process.
	 * @returns The processed body.
	 */
	public async handle(body: Uint8Array): Promise<unknown> {
		return Converter.bytesToUtf8(body);
	}
}
