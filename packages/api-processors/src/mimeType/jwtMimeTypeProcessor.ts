// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IMimeTypeProcessor } from "@twin.org/api-models";
import { Converter } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { MimeTypes } from "@twin.org/web";

/**
 * Process the JWT mime type.
 */
export class JwtMimeTypeProcessor implements IMimeTypeProcessor {
	/**
	 * The namespace supported by the processor.
	 */
	public static readonly NAMESPACE: string = "jwt";

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<JwtMimeTypeProcessor>();

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
