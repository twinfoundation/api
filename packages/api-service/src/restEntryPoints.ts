// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRestRouteEntryPoint } from "@gtsc/api-models";
import { generateRestRoutesInformation, tagsInformation } from "./informationRoutes";

export const restEntryPoints: IRestRouteEntryPoint[] = [
	{
		name: "information",
		tags: tagsInformation,
		generateRoutes: generateRestRoutesInformation
	}
];
