// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRouteResponseAttachmentOptions } from "./IRestRouteResponseAttachmentOptions";
import type { IRestRouteResponseAuthOptions } from "./IRestRouteResponseAuthOptions";

/**
 * Interface which defines a REST route response.
 */
export interface IRestRouteResponseOptions {
	/**
	 * Additional options that can be used to control the response.
	 */
	attachment?: IRestRouteResponseAttachmentOptions;

	/**
	 * Additional options that can be used to control the authentication response.
	 */
	auth?: IRestRouteResponseAuthOptions;
}
