# Function: requestLoggingProcessor()

> **requestLoggingProcessor**(`request`, `response`, `route`, `requestContext`, `state`, `options`?): `Promise`\<`void`\>

Process the REST request and log its information.

## Parameters

• **request**: `IHttpServerRequest`\<`any`\>

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

• **options.includeBody?**: `boolean`

Include the body objects when logging the information.

## Returns

`Promise`\<`void`\>
