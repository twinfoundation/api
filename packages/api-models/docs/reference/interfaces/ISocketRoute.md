# Interface: ISocketRoute

Interface which defines a socket route.

## Hierarchy

- [`IBaseRoute`](IBaseRoute.md)

  ↳ **`ISocketRoute`**

## Properties

### handler

• **handler**: (`requestContext`: `IRequestContext`, `socketId`: `string`, `request`: `any`, `emitter`: (`topic`: `string`, `response?`: `unknown`) => `Promise`\<`void`\>) => `Promise`\<`void`\>

The handler module.

#### Type declaration

▸ (`requestContext`, `socketId`, `request`, `emitter`): `Promise`\<`void`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestContext` | `IRequestContext` | The request context. |
| `socketId` | `string` | The id of the socket the request is arriving on. |
| `request` | `any` | The request object. |
| `emitter` | (`topic`: `string`, `response?`: `unknown`) => `Promise`\<`void`\> | Method to emit data on the socket. |

##### Returns

`Promise`\<`void`\>

___

### operationId

• **operationId**: `string`

The id of the operation.

#### Inherited from

[IBaseRoute](IBaseRoute.md).[operationId](IBaseRoute.md#operationid)

___

### path

• **path**: `string`

The path to use for routing.

#### Inherited from

[IBaseRoute](IBaseRoute.md).[path](IBaseRoute.md#path)

___

### skipSubjectAuth

• `Optional` **skipSubjectAuth**: `boolean`

Skips the subject authentication for this route.

#### Inherited from

[IBaseRoute](IBaseRoute.md).[skipSubjectAuth](IBaseRoute.md#skipsubjectauth)

___

### skipTenantAuth

• `Optional` **skipTenantAuth**: `boolean`

Skips the tenant authentication for this route.

#### Inherited from

[IBaseRoute](IBaseRoute.md).[skipTenantAuth](IBaseRoute.md#skiptenantauth)
