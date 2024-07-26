// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter } from "@gtsc/core";
import { Blake2b } from "@gtsc/crypto";

/**
 * Helper class for password operations.
 */
export class PasswordHelper {
	/**
	 * Hash the password for the user.
	 * @param passwordBytes The password bytes.
	 * @param saltBytes The salt bytes.
	 * @returns The hashed password.
	 * @internal
	 */
	public static async hashPassword(
		passwordBytes: Uint8Array,
		saltBytes: Uint8Array
	): Promise<string> {
		const combined = new Uint8Array(saltBytes.length + passwordBytes.length);
		combined.set(saltBytes);
		combined.set(passwordBytes, saltBytes.length);

		const hashedPassword = Blake2b.sum256(combined);

		return Converter.bytesToBase64(hashedPassword);
	}
}
