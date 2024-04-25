# Interface: IBaseRoute

Interface which defines a route.

## Hierarchy

- **`IBaseRoute`**

  ↳ [`IRestRoute`](IRestRoute.md)

  ↳ [`ISocketRoute`](ISocketRoute.md)

## Properties

### operationId

• **operationId**: `string`

The id of the operation.

___

### path

• **path**: `string`

The path to use for routing.

___

### skipSubjectAuth

• `Optional` **skipSubjectAuth**: `boolean`

Skips the subject authentication for this route.

___

### skipTenantAuth

• `Optional` **skipTenantAuth**: `boolean`

Skips the tenant authentication for this route.
