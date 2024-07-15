// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpStatusCode } from "@gtsc/web";

/**
 * The OpenAPI spec for the endpoints.
 */
export interface IServerSpecResponse {
	/**
	 * Response status code.
	 */
	statusCode?: HttpStatusCode;

	/**
	 * The spec for the server.
	 */
	body?: unknown;
}
