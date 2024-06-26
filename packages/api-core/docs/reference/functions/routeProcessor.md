# Function: routeProcessor()

> **routeProcessor**(`requestContext`, `request`, `response`, `route`, `state`, `options`?): `Promise`\<`void`\>

Process the REST request and hands it on to the route handler.

## Parameters

• **requestContext**: `IRequestContext`

The context for the request.

• **request**: `IHttpRequest`\<`unknown`\>

The incoming request.

• **response**: `IHttpResponse`\<`unknown`\>

The outgoing response.

• **route**: `undefined` \| `IRestRoute`\<`any`, `any`\>

The route to process.

• **state**

The state for the request.

• **options?**

Additional options for the processing.

• **options.includeErrorStack?**: `boolean`

Include the error stack when logging errors.

## Returns

`Promise`\<`void`\>
