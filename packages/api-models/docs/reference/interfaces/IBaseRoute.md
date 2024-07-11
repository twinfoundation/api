# Interface: IBaseRoute

Interface which defines a route.

## Extended by

- [`IRestRoute`](IRestRoute.md)
- [`ISocketRoute`](ISocketRoute.md)

## Properties

### operationId

> **operationId**: `string`

The id of the operation.

***

### path

> **path**: `string`

The path to use for routing.

***

### skipAuth?

> `optional` **skipAuth**: `boolean`

Skips the authentication for this route.
