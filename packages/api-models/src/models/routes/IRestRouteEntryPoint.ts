// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRoute } from "./IRestRoute";
import type { ITag } from "./ITag";

/**
 * Route entry points are used for exposing the REST routes from a package.
 */
export interface IRestRouteEntryPoint {
	/**
	 * The name of the REST routes.
	 */
	name: string;

	/**
	 * The tags for the REST routes.
	 */
	tags: ITag[];

	/**
	 * The method to generate the REST routes.
	 */
	generateRoutes: (baseRouteName: string, factoryServiceName: string) => IRestRoute[];
}
