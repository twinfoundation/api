// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRouteEntryPoint } from "@twin.org/api-models";
import {
	generateRestRoutesAuthentication,
	tagsAuthentication
} from "./routes/entityStorageAuthenticationRoutes";

export const restEntryPoints: IRestRouteEntryPoint[] = [
	{
		name: "authentication",
		defaultBaseRoute: "authentication",
		tags: tagsAuthentication,
		generateRoutes: generateRestRoutesAuthentication
	}
];
