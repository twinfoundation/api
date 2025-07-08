// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IMimeTypeProcessor } from "@twin.org/api-models";
import { GeneralError, Is, ObjectHelper } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { MimeTypes } from "@twin.org/web";

/**
 * Process the JSON-LD mime type.
 */
export class JsonLdMimeTypeProcessor implements IMimeTypeProcessor {
	/**
	 * The namespace supported by the processor.
	 */
	public static readonly NAMESPACE: string = "json-ld";

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<JsonLdMimeTypeProcessor>();

	/**
	 * Get the MIME types that this handler can handle.
	 * @returns The MIME types that this handler can handle.
	 */
	public getTypes(): string[] {
		return [MimeTypes.JsonLd];
	}

	/**
	 * Handle content.
	 * @param body The body to process.
	 * @returns The processed body.
	 */
	public async handle(body: Uint8Array): Promise<unknown> {
		const json = ObjectHelper.fromBytes<{ "@context"?: string }>(body);

		if (Is.empty(json) || Is.empty(json["@context"])) {
			throw new GeneralError(this.CLASS_NAME, "invalidJsonLd");
		}

		return json;
	}
}
