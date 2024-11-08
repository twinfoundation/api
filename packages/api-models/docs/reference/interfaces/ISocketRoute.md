# Interface: ISocketRoute\<T, U\>

Interface which defines a socket route.

## Extends

- [`IBaseRoute`](IBaseRoute.md)

## Type Parameters

• **T** *extends* [`IHttpRequest`](IHttpRequest.md) = `any`

• **U** *extends* [`IHttpResponse`](IHttpResponse.md) = `any`

## Properties

### operationId

> **operationId**: `string`

The id of the operation.

#### Inherited from

[`IBaseRoute`](IBaseRoute.md).[`operationId`](IBaseRoute.md#operationid)

***

### path

> **path**: `string`

The path to use for routing.

#### Inherited from

[`IBaseRoute`](IBaseRoute.md).[`path`](IBaseRoute.md#path)

***

### skipAuth?

> `optional` **skipAuth**: `boolean`

Skips the authentication for this route.

#### Inherited from

[`IBaseRoute`](IBaseRoute.md).[`skipAuth`](IBaseRoute.md#skipauth)

***

### handler()

> **handler**: (`httpRequestContext`, `request`, `emit`) => `void`

The handler module.

#### Parameters

• **httpRequestContext**: [`IHttpRequestContext`](IHttpRequestContext.md)

The request context.

• **request**: `T`

The request object.

• **emit**

The function to emit a message.

#### Returns

`void`
