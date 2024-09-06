# Interface: IHttpRestRouteProcessor

The definition for a processor for handling REST routes.

## Extends

- `IComponent`

## Methods

### pre()?

> `optional` **pre**(`request`, `response`, `route`, `requestIdentity`, `processorState`): `Promise`\<`void`\>

Pre process the REST request for the specified route.

#### Parameters

• **request**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The request to handle.

• **response**: [`IHttpResponse`](IHttpResponse.md)\<`any`\>

The response data to send if any.

• **route**: `undefined` \| [`IRestRoute`](IRestRoute.md)\<`any`, `any`\>

The route being requested, if a matching one was found.

• **requestIdentity**: [`IHttpRequestIdentity`](IHttpRequestIdentity.md)

The identity context for the request.

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.

***

### process()?

> `optional` **process**(`request`, `response`, `route`, `requestIdentity`, `processorState`): `Promise`\<`void`\>

Process the REST request for the specified route.

#### Parameters

• **request**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The request to handle.

• **response**: [`IHttpResponse`](IHttpResponse.md)\<`any`\>

The response data to send if any.

• **route**: `undefined` \| [`IRestRoute`](IRestRoute.md)\<`any`, `any`\>

The route being requested, if a matching one was found.

• **requestIdentity**: [`IHttpRequestIdentity`](IHttpRequestIdentity.md)

The identity context for the request.

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.

***

### post()?

> `optional` **post**(`request`, `response`, `route`, `requestIdentity`, `processorState`): `Promise`\<`void`\>

Post process the REST request for the specified route.

#### Parameters

• **request**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The request to handle.

• **response**: [`IHttpResponse`](IHttpResponse.md)\<`any`\>

The response data to send if any.

• **route**: `undefined` \| [`IRestRoute`](IRestRoute.md)\<`any`, `any`\>

The route being requested, if a matching one was found.

• **requestIdentity**: [`IHttpRequestIdentity`](IHttpRequestIdentity.md)

The identity context for the request.

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.
