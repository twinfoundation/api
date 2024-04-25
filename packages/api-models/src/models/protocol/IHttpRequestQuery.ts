// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Model used for Http request query parameters.
 */
export interface IHttpRequestQuery {
	[id: string]: string | number | boolean | unknown;
}
