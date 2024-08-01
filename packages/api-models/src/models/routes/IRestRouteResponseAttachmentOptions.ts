// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Interface which defines a REST route response for attachments.
 */
export interface IRestRouteResponseAttachmentOptions {
	/**
	 * The content type to use in the response.
	 */
	mimeType?: string;

	/**
	 * The filename to use in content disposition.
	 */
	filename?: string;

	/**
	 * Whether to inline the content.
	 */
	inline?: boolean;
}
