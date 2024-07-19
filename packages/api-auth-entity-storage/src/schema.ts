// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { EntitySchemaFactory, EntitySchemaHelper } from "@gtsc/entity";
import { nameof } from "@gtsc/nameof";
import { AuthenticationUser } from "./entities/authenticationUser";

/**
 * Initialize the schema for the authentication service.
 */
export function initSchema(): void {
	EntitySchemaFactory.register(nameof<AuthenticationUser>(), () =>
		EntitySchemaHelper.getSchema(AuthenticationUser)
	);
}
