# Function: parseAcceptLanguageHeader()

> **parseAcceptLanguageHeader**(`acceptLanguage`): `string`[]

Parse and sort the locales in Accept-Language by quality.

## Parameters

• **acceptLanguage**: `undefined` \| `string`

The Accept-Language header value.

## Returns

`string`[]

The list of locales in order of preference (q-value).
