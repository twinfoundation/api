# Function: localeProcessor()

> **localeProcessor**(`requestContext`, `request`, `response`, `route`, `state`, `options`?): `Promise`\<`void`\>

Process the REST request to check for locale information.

## Parameters

• **requestContext**: `IRequestContext`

The context for the request.

• **request**: `IHttpRequest`\<`unknown`\>

The incoming request.

• **response**: `IHttpResponse`\<`unknown`\>

The outgoing response.

• **route**: `undefined` \| `IRestRoute`\<`IHttpRequest`\<`unknown`\>, `IHttpResponse`\<`unknown`\> & `IRestRouteResponseOptions`\>

The route to process.

• **state**

• **options?**: `undefined`

## Returns

`Promise`\<`void`\>
