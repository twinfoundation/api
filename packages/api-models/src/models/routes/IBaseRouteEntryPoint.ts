// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { ITag } from "./ITag";

/**
 * Route entry points are used for exposing the routes from a package.
 */
export interface IBaseRouteEntryPoint<T> {
	/**
	 * The name of the routes.
	 */
	name: string;

	/**
	 * The default base route name for the routes.
	 */
	defaultBaseRoute: string;

	/**
	 * The tags for the routes.
	 */
	tags: ITag[];

	/**
	 * The method to generate the routes.
	 */
	generateRoutes: (baseRouteName: string, componentName: string) => T[];
}
