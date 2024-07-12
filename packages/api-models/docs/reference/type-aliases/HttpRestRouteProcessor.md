# Type alias: HttpRestRouteProcessor()\<T\>

> **HttpRestRouteProcessor**\<`T`\>: (`request`, `response`, `route`, `requestContext`, `state`, `options`?) => `Promise`\<`void`\>

Process the REST request for the specified route.

## Type parameters

• **T** = `never`

## Parameters

• **request**: [`IHttpRequest`](../interfaces/IHttpRequest.md)

The request to handle.

• **response**: [`IHttpResponse`](../interfaces/IHttpResponse.md)

The response data to send if any.

• **route**: [`IRestRoute`](../interfaces/IRestRoute.md) \| `undefined`

The route being requested, if a matching one was found.

• **requestContext**: `IServiceRequestContext`

The context for the request.

• **state**

The state for the request.

• **options?**: `T`

Options for the processor.

## Returns

`Promise`\<`void`\>
