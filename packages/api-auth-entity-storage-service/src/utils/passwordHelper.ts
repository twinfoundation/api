// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Converter, Guards } from "@gtsc/core";
import { Blake2b } from "@gtsc/crypto";
import { nameof } from "@gtsc/nameof";

/**
 * Helper class for password operations.
 */
export class PasswordHelper {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<PasswordHelper>();

	/**
	 * Hash the password for the user.
	 * @param passwordBytes The password bytes.
	 * @param saltBytes The salt bytes.
	 * @returns The hashed password.
	 */
	public static async hashPassword(
		passwordBytes: Uint8Array,
		saltBytes: Uint8Array
	): Promise<string> {
		Guards.uint8Array(PasswordHelper._CLASS_NAME, nameof(passwordBytes), passwordBytes);
		Guards.uint8Array(PasswordHelper._CLASS_NAME, nameof(saltBytes), saltBytes);

		const combined = new Uint8Array(saltBytes.length + passwordBytes.length);
		combined.set(saltBytes);
		combined.set(passwordBytes, saltBytes.length);

		const hashedPassword = Blake2b.sum256(combined);

		return Converter.bytesToBase64(hashedPassword);
	}
}
