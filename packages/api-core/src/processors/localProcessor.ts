// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type {
	HttpRestRouteProcessor,
	IHttpRequest,
	IHttpResponse,
	IRestRoute
} from "@gtsc/api-models";
import { Coerce, I18n } from "@gtsc/core";
import type { IRequestContext } from "@gtsc/services";

/**
 * Process the REST request to check for locale information.
 * @param requestContext The context for the request.
 * @param request The incoming request.
 * @param response The outgoing response.
 * @param route The route to process.
 */
export const localeProcessor: HttpRestRouteProcessor = async (
	requestContext: IRequestContext,
	request: IHttpRequest,
	response: IHttpResponse,
	route: IRestRoute | undefined
) => {
	const orderedLocales = parseAcceptLanguageHeader(
		Coerce.string(request.headers?.["accept-language"])
	);

	requestContext.locale = "en";

	for (const locale of orderedLocales) {
		if (I18n.getDictionary(locale)) {
			requestContext.locale = locale;
			break;
		}
	}
};

/**
 * Parse and sort the locales in Accept-Language by quality.
 * @param acceptLanguage The Accept-Language header value.
 * @returns The list of locales in order of preference (q-value).
 */
export function parseAcceptLanguageHeader(acceptLanguage: string | undefined): string[] {
	if (!acceptLanguage) {
		return [];
	}

	const acceptList = acceptLanguage.match(
		/((([A-Za-z]+(-[\dA-Za-z]+){0,2})|\*)(;q=[01](\.\d+)?)?)*/g
	);

	if (acceptList === null) {
		return [];
	}

	return acceptList
		.filter(Boolean)
		.map(accept => {
			const [locale, qString] = accept.split(";") as [string, string | undefined];
			const qParts = qString?.split("=") as undefined | [string, string];

			return {
				locale,
				q: qParts?.[1] ? Number.parseFloat(qParts[1]) : 1
			};
		})
		.sort((a, b) => b.q - a.q)
		.map(parsed => parsed.locale);
}
