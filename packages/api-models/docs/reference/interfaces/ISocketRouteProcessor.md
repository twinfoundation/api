# Interface: ISocketRouteProcessor

The definition for a processor for handling socket routes.

## Extends

- [`IBaseRouteProcessor`](IBaseRouteProcessor.md)\<[`ISocketRoute`](ISocketRoute.md)\>

## Methods

### pre()?

> `optional` **pre**(`request`, `response`, `route`, `requestIdentity`, `processorState`): `Promise`\<`void`\>

Pre process the REST request for the specified route.

#### Parameters

##### request

[`IHttpServerRequest`](IHttpServerRequest.md)

The request to handle.

##### response

[`IHttpResponse`](IHttpResponse.md)

The response data to send if any.

##### route

The route being requested, if a matching one was found.

`undefined` | [`ISocketRoute`](ISocketRoute.md)\<`any`, `any`\>

##### requestIdentity

[`IHttpRequestIdentity`](IHttpRequestIdentity.md)

The identity context for the request.

##### processorState

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

##### request

[`IHttpServerRequest`](IHttpServerRequest.md)

The request to handle.

##### response

[`IHttpResponse`](IHttpResponse.md)

The response data to send if any.

##### route

The route being requested, if a matching one was found.

`undefined` | [`ISocketRoute`](ISocketRoute.md)\<`any`, `any`\>

##### requestIdentity

[`IHttpRequestIdentity`](IHttpRequestIdentity.md)

The identity context for the request.

##### processorState

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

##### request

[`IHttpServerRequest`](IHttpServerRequest.md)

The request to handle.

##### route

The route being requested, if a matching one was found.

`undefined` | [`ISocketRoute`](ISocketRoute.md)\<`any`, `any`\>

##### processorState

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.

***

### disconnected()?

> `optional` **disconnected**(`request`, `route`, `processorState`): `Promise`\<`void`\>

Process the disconnected event.

#### Parameters

##### request

[`IHttpServerRequest`](IHttpServerRequest.md)

The request to handle.

##### route

The route being requested, if a matching one was found.

`undefined` | [`ISocketRoute`](ISocketRoute.md)\<`any`, `any`\>

##### processorState

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.

***

### process()?

> `optional` **process**(`request`, `response`, `route`, `requestIdentity`, `processorState`, `responseEmitter`): `Promise`\<`void`\>

Process the REST request for the specified route.

#### Parameters

##### request

[`IHttpServerRequest`](IHttpServerRequest.md)

The request to handle.

##### response

[`IHttpResponse`](IHttpResponse.md)

The response data to send if any.

##### route

The route being requested, if a matching one was found.

`undefined` | [`ISocketRoute`](ISocketRoute.md)\<`any`, `any`\>

##### requestIdentity

[`IHttpRequestIdentity`](IHttpRequestIdentity.md)

The identity context for the request.

##### processorState

The state handed through the processors.

##### responseEmitter

(`topic`, `response`) => `Promise`\<`void`\>

The function to emit a response.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.
