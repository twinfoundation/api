// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Factory } from "@twin.org/core";
import type { IMimeTypeProcessor } from "../models/server/IMimeTypeProcessor";

/**
 * Factory for creating implementation of mime type processor types.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const MimeTypeProcessorFactory =
	Factory.createFactory<IMimeTypeProcessor>("mime-type-processor");
