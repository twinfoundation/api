# Interface: ISocketRouteProcessor

The definition for a processor for handling socket routes.

## Extends

- [`IBaseRouteProcessor`](IBaseRouteProcessor.md)\<[`ISocketRoute`](ISocketRoute.md)\>

## Methods

### pre()?

> `optional` **pre**(`request`, `response`, `route`, `requestIdentity`, `processorState`): `Promise`\<`void`\>

Pre process the REST request for the specified route.

#### Parameters

• **request**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The request to handle.

• **response**: [`IHttpResponse`](IHttpResponse.md)\<`any`\>

The response data to send if any.

• **route**: `undefined` \| [`ISocketRoute`](ISocketRoute.md)\<`any`, `any`\>

The route being requested, if a matching one was found.

• **requestIdentity**: [`IHttpRequestIdentity`](IHttpRequestIdentity.md)

The identity context for the request.

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.

#### Inherited from

[`IBaseRouteProcessor`](IBaseRouteProcessor.md).[`pre`](IBaseRouteProcessor.md#pre)

***

### post()?

> `optional` **post**(`request`, `response`, `route`, `requestIdentity`, `processorState`): `Promise`\<`void`\>

Post process the REST request for the specified route.

#### Parameters

• **request**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The request to handle.

• **response**: [`IHttpResponse`](IHttpResponse.md)\<`any`\>

The response data to send if any.

• **route**: `undefined` \| [`ISocketRoute`](ISocketRoute.md)\<`any`, `any`\>

The route being requested, if a matching one was found.

• **requestIdentity**: [`IHttpRequestIdentity`](IHttpRequestIdentity.md)

The identity context for the request.

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.

#### Inherited from

[`IBaseRouteProcessor`](IBaseRouteProcessor.md).[`post`](IBaseRouteProcessor.md#post)

***

### connected()?

> `optional` **connected**(`request`, `route`, `processorState`): `Promise`\<`void`\>

Process the connected event.

#### Parameters

• **request**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The request to handle.

• **route**: `undefined` \| [`ISocketRoute`](ISocketRoute.md)\<`any`, `any`\>

The route being requested, if a matching one was found.

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.

***

### disconnected()?

> `optional` **disconnected**(`request`, `route`, `processorState`): `Promise`\<`void`\>

Process the disconnected event.

#### Parameters

• **request**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The request to handle.

• **route**: `undefined` \| [`ISocketRoute`](ISocketRoute.md)\<`any`, `any`\>

The route being requested, if a matching one was found.

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.

***

### process()?

> `optional` **process**(`request`, `response`, `route`, `requestIdentity`, `processorState`, `responseEmitter`): `Promise`\<`void`\>

Process the REST request for the specified route.

#### Parameters

• **request**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The request to handle.

• **response**: [`IHttpResponse`](IHttpResponse.md)\<`any`\>

The response data to send if any.

• **route**: `undefined` \| [`ISocketRoute`](ISocketRoute.md)\<`any`, `any`\>

The route being requested, if a matching one was found.

• **requestIdentity**: [`IHttpRequestIdentity`](IHttpRequestIdentity.md)

The identity context for the request.

• **processorState**

The state handed through the processors.

• **responseEmitter**

The function to emit a response.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.
