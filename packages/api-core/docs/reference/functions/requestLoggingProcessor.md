# Function: requestLoggingProcessor()

> **requestLoggingProcessor**(`requestContext`, `request`, `response`, `route`, `state`, `options`?): `Promise`\<`void`\>

Process the REST request and log its information.

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

• **options.includeBody?**: `boolean`

Include the body objects when logging the information.

## Returns

`Promise`\<`void`\>
