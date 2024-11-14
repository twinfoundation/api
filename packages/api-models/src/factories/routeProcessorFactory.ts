// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Factory } from "@twin.org/core";
import type { IBaseRouteProcessor } from "../models/server/IBaseRouteProcessor";

/**
 * Factory for creating implementation of route processor types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const RouteProcessorFactory = Factory.createFactory<IBaseRouteProcessor>("route-processor");
