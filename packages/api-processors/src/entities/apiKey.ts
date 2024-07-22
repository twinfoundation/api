// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { entity, property } from "@gtsc/entity";

/**
 * Class defining the mapping from api key to partition id.
 */
@entity()
export class ApiKey {
	/**
	 * The key.
	 */
	@property({ type: "string", isPrimary: true })
	public key!: string;

	/**
	 * The partition id for the data.
	 */
	@property({ type: "string" })
	public partitionId!: string;

	/**
	 * The owner of the api key.
	 */
	@property({ type: "string", isSecondary: true })
	public owner!: string;
}
