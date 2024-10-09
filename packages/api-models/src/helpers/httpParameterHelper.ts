// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Coerce, Is } from "@twin.org/core";

/**
 * Class to help with handling http parameters.
 */
export class HttpParameterHelper {
	/**
	 * Convert list query to array.
	 * @param values The values query string.
	 * @returns The array of values.
	 */
	public static arrayFromString<T = string>(values?: string): T[] | undefined {
		return values?.split(",") as T[];
	}

	/**
	 * Convert array of values to query string.
	 * @param values The values to combine string.
	 * @returns The combined.
	 */
	public static arrayToString<T = string>(values?: T[]): string | undefined {
		return values?.join(",");
	}

	/**
	 * Convert object string to object.
	 * @param value The value query string.
	 * @returns The object.
	 */
	public static objectFromString<T = unknown>(value?: string): T | undefined {
		return Coerce.object<T>(value);
	}

	/**
	 * Convert object to query string.
	 * @param value The value to convert to a string.
	 * @returns The converted object.
	 */
	public static objectToString<T = unknown>(value?: T): string | undefined {
		return Is.object(value) ? JSON.stringify(value) : undefined;
	}
}
