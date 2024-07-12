# Function: routeProcessor()

> **routeProcessor**(`request`, `response`, `route`, `requestContext`, `state`, `options`?): `Promise`\<`void`\>

Process the REST request and hands it on to the route handler.

## Parameters

• **request**: `IHttpRequest`\<`any`\>

The incoming request.

• **response**: `IHttpResponse`\<`any`\>

The outgoing response.

• **route**: `undefined` \| `IRestRoute`\<`any`, `any`\>

The route to process.

• **requestContext**: `IServiceRequestContext`

The context for the request.

• **state**

The state for the request.

• **options?**

Additional options for the processing.

• **options.includeErrorStack?**: `boolean`

Include the error stack when logging errors.

## Returns

`Promise`\<`void`\>
