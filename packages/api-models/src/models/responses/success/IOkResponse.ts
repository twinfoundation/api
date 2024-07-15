// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { HttpStatusCode } from "@gtsc/web";

/**
 * The rest request ended in success with no data.
 */
export interface IOkResponse {
	/**
	 * Response status code.
	 */
	statusCode: typeof HttpStatusCode.ok;
}
