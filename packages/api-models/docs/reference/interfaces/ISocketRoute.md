# Interface: ISocketRoute

Interface which defines a socket route.

## Extends

- [`IBaseRoute`](IBaseRoute.md)

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

> **handler**: (`requestContext`, `socketId`, `request`, `emitter`) => `Promise`\<`void`\>

The handler module.

#### Parameters

• **requestContext**: `IServiceRequestContext`

The request context.

• **socketId**: `string`

The id of the socket the request is arriving on.

• **request**: `unknown`

The request object.

• **emitter**

Method to emit data on the socket.

#### Returns

`Promise`\<`void`\>
