// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { EntitySchemaFactory, EntitySchemaHelper } from "@gtsc/entity";
import { nameof } from "@gtsc/nameof";
import { ApiKey } from "./entities/apiKey";

/**
 * Initialize the schema for the api processors.
 */
export function initSchema(): void {
	EntitySchemaFactory.register(nameof<ApiKey>(), () => EntitySchemaHelper.getSchema(ApiKey));
}
