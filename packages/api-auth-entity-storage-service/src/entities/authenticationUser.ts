// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { entity, property } from "@twin.org/entity";

/**
 * Class defining the storage for user login credentials.
 */
@entity()
export class AuthenticationUser {
	/**
	 * The user e-mail address.
	 */
	@property({ type: "string", isPrimary: true })
	public email!: string;

	/**
	 * The encrypted password for the user.
	 */
	@property({ type: "string" })
	public password!: string;

	/**
	 * The salt for the password.
	 */
	@property({ type: "string" })
	public salt!: string;

	/**
	 * The user identity.
	 */
	@property({ type: "string" })
	public identity!: string;
}
