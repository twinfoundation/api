// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Factory } from "@twin.org/core";
import type { IRestRouteProcessor } from "../models/server/IRestRouteProcessor";

/**
 * Factory for creating implementation of REST route processor types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RestRouteProcessorFactory =
	Factory.createFactory<IRestRouteProcessor>("rest-route-processor");
