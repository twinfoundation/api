// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "@twin.org/core";
import type { ComparisonOperator, IComparator } from "@twin.org/entity";

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
	 * Convert the conditions string to a list of comparators.
	 * @param conditions The conditions query string.
	 * @returns The list of comparators.
	 */
	public static conditionsFromString(conditions?: string): IComparator[] | undefined {
		const conditionParts = conditions?.split(",") ?? [];
		const conditionsList: IComparator[] = [];

		for (const conditionPart of conditionParts) {
			const parts = conditionPart.split("|");
			if (parts.length === 3) {
				conditionsList.push({
					property: parts[0],
					comparison: parts[1] as ComparisonOperator,
					value: parts[2]
				});
			}
		}

		return conditionsList.length === 0 ? undefined : conditionsList;
	}

	/**
	 * Convert the conditions to a string parameter.
	 * @param conditions The conditions to convert.
	 * @returns The string version of the comparators.
	 */
	public static conditionsToString(conditions?: IComparator[]): string | undefined {
		if (Is.arrayValue(conditions)) {
			const conditionsList: string[] = [];
			for (const conditionPart of conditions) {
				conditionsList.push(
					`${conditionPart.property}|${conditionPart.comparison}|${conditionPart.value}`
				);
			}
			return conditionsList.join(",");
		}
	}
}
