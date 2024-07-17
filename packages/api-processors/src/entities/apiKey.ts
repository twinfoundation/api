// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { entity, property } from "@gtsc/entity";

/**
 * Class defining the mapping from api key to partition id.
 */
@entity()
export class ApiKey {
	/**
	 * The id.
	 */
	@property({ type: "string", isPrimary: true })
	public id!: string;

	/**
	 * The partition id for the data.
	 */
	@property({ type: "string" })
	public partitionId!: string;
}
