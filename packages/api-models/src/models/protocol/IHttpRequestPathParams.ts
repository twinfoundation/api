// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

/**
 * Model for the standard parameters for an http request.
 */
export interface IHttpRequestPathParams {
	[id: string]: string | number | boolean;
}
