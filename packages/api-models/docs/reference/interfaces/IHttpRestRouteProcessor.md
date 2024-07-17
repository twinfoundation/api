# Interface: IHttpRestRouteProcessor

The definition for a processor for handling REST routes.

## Methods

### process()

> **process**(`request`, `response`, `route`, `requestContext`, `state`): `Promise`\<`void`\>

Process the REST request for the specified route.

#### Parameters

• **request**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The request to handle.

• **response**: [`IHttpResponse`](IHttpResponse.md)\<`any`\>

The response data to send if any.

• **route**: `undefined` \| [`IRestRoute`](IRestRoute.md)\<`any`, `any`\>

The route being requested, if a matching one was found.

• **requestContext**: `IServiceRequestContext`

The context for the request.

• **state**

The state for the request.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.
