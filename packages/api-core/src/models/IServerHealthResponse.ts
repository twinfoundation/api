// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IServerHealth } from "./IServerHealth";

/**
 * The health of the server.
 */
export interface IServerHealthResponse {
	/**
	 * The information for the server.
	 */
	body: IServerHealth;
}
