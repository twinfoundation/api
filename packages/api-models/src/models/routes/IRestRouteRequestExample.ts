// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRouteExample } from "./IRestRouteExample";

/**
 * Interface which defines a REST route request example.
 */
export interface IRestRouteRequestExample<T> extends IRestRouteExample {
	/**
	 * The example request object.
	 */
	request: T;
}
