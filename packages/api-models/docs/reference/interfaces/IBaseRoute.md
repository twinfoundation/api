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

### skipTenantAuth?

> `optional` **skipTenantAuth**: `boolean`

Skips the tenant authentication for this route.

***

### skipSubjectAuth?

> `optional` **skipSubjectAuth**: `boolean`

Skips the subject authentication for this route.
