// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IHealthInfo } from "../services/IHealthInfo";

/**
 * The health of the server.
 */
export interface IServerHealthResponse {
	/**
	 * The information for the server.
	 */
	body: IHealthInfo;
}
