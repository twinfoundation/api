// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Is } from "@twin.org/core";
import type { ComparisonOperator, IComparator, SortDirection } from "@twin.org/entity";

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

	/**
	 * Convert the sort string to a list of sort properties.
	 * @param sortProperties The sort properties query string.
	 * @returns The list of sort properties.
	 */
	public static sortPropertiesFromString<T = unknown>(
		sortProperties?: string
	):
		| {
				property: keyof T;
				sortDirection: SortDirection;
		  }[]
		| undefined {
		const sortParts = sortProperties?.split(",") ?? [];
		const sortPropertyList: {
			property: keyof T;
			sortDirection: SortDirection;
		}[] = [];

		for (const conditionPart of sortParts) {
			const parts = conditionPart.split("|");
			if (parts.length === 2) {
				sortPropertyList.push({
					property: parts[0] as keyof T,
					sortDirection: parts[1] as SortDirection
				});
			}
		}

		return sortPropertyList.length === 0 ? undefined : sortPropertyList;
	}

	/**
	 * Convert the sort properties to a string parameter.
	 * @param sortProperties The sort properties to convert.
	 * @returns The string version of the sort properties.
	 */
	public static sortPropertiesToString<T = unknown>(
		sortProperties?: {
			property: keyof T;
			sortDirection: SortDirection;
		}[]
	): string | undefined {
		if (Is.arrayValue(sortProperties)) {
			const sortPropertyList: string[] = [];
			for (const conditionPart of sortProperties) {
				sortPropertyList.push(`${conditionPart.property as string}|${conditionPart.sortDirection}`);
			}
			return sortPropertyList.join(",");
		}
	}
}
