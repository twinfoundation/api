// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IServerInfo } from "./IServerInfo";

/**
 * The information about the server.
 */
export interface IServerInfoResponse {
	/**
	 * The information for the server.
	 */
	body: IServerInfo;
}
