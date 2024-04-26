# Interface: IRestRoute

Interface which defines a REST route.

## Hierarchy

- [`IBaseRoute`](IBaseRoute.md)

  ↳ **`IRestRoute`**

## Properties

### handler

• **handler**: (`requestContext`: `IRequestContext`, `request`: `any`, `body?`: `unknown`) => `Promise`\<`any`\>

The handler module.

#### Type declaration

▸ (`requestContext`, `request`, `body?`): `Promise`\<`any`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestContext` | `IRequestContext` | The request context. |
| `request` | `any` | The request object, combined query param, path params and body. |
| `body?` | `unknown` | Body as standalone if it's a data request. |

##### Returns

`Promise`\<`any`\>

___

### method

• **method**: `HttpMethods`

The http method.

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

### requestContentType

• `Optional` **requestContentType**: \{ `description`: `string` ; `mimeType`: `string`  }[]

The request can have alternative content mime types.

___

### requestType

• `Optional` **requestType**: `string`

The type of the request object.

___

### responseContentType

• `Optional` **responseContentType**: \{ `description`: `string` ; `mimeType`: `string`  }[]

The response can have alternative content mime types.

___

### responseType

• `Optional` **responseType**: `string` \| \{ `statusCode`: `HttpStatusCodes` ; `type`: `string`  }[]

The type of the response object.

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

___

### summary

• **summary**: `string`

Summary of what task the operation performs.

___

### tag

• **tag**: `string`

Tag for the operation.
