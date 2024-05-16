# Interface: ISocketRoute

Interface which defines a socket route.

## Extends

- [`IBaseRoute`](IBaseRoute.md)

## Properties

### handler()

> **handler**: (`requestContext`, `socketId`, `request`, `emitter`) => `Promise`\<`void`\>

The handler module.

#### Parameters

• **requestContext**: `IRequestContext`

The request context.

• **socketId**: `string`

The id of the socket the request is arriving on.

• **request**: `unknown`

The request object.

• **emitter**

Method to emit data on the socket.

#### Returns

`Promise`\<`void`\>

***

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

### skipSubjectAuth?

> `optional` **skipSubjectAuth**: `boolean`

Skips the subject authentication for this route.

#### Inherited from

[`IBaseRoute`](IBaseRoute.md).[`skipSubjectAuth`](IBaseRoute.md#skipsubjectauth)

***

### skipTenantAuth?

> `optional` **skipTenantAuth**: `boolean`

Skips the tenant authentication for this route.

#### Inherited from

[`IBaseRoute`](IBaseRoute.md).[`skipTenantAuth`](IBaseRoute.md#skiptenantauth)
