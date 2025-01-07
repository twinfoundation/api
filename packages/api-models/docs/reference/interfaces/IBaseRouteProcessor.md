# Interface: IBaseRouteProcessor\<T\>

The definition for a base processor for handling REST routes.

## Extends

- `IComponent`

## Extended by

- [`IRestRouteProcessor`](IRestRouteProcessor.md)
- [`ISocketRouteProcessor`](ISocketRouteProcessor.md)

## Type Parameters

• **T** = [`IBaseRoute`](IBaseRoute.md)

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

`undefined` | `T`

##### requestIdentity

[`IHttpRequestIdentity`](IHttpRequestIdentity.md)

The identity context for the request.

##### processorState

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.

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

`undefined` | `T`

##### requestIdentity

[`IHttpRequestIdentity`](IHttpRequestIdentity.md)

The identity context for the request.

##### processorState

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.
