# Interface: IRestRoute\<T, U\>

Interface which defines a REST route.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |
| `U` | `any` |

## Hierarchy

- [`IBaseRoute`](IBaseRoute.md)

  ↳ **`IRestRoute`**

## Properties

### handler

• **handler**: (`requestContext`: [`IHttpRequestContext`](IHttpRequestContext.md), `request`: `T`, `body?`: `unknown`) => `Promise`\<`U`\>

The handler module.

#### Type declaration

▸ (`requestContext`, `request`, `body?`): `Promise`\<`U`\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestContext` | [`IHttpRequestContext`](IHttpRequestContext.md) | The request context. |
| `request` | `T` | The request object, combined query param, path params and body. |
| `body?` | `unknown` | Body as standalone if it's a data request. |

##### Returns

`Promise`\<`U`\>

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

• `Optional` **requestType**: `Object`

The type of the request object.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `examples?` | \{ `description?`: `string` ; `id`: `string` ; `request`: `T`  }[] | Example objects for the request. |
| `type` | `string` | The object type for the request. |

___

### responseContentType

• `Optional` **responseContentType**: \{ `description`: `string` ; `mimeType`: `string`  }[]

The response can have alternative content mime types.

___

### responseType

• `Optional` **responseType**: \{ `examples?`: \{ `description?`: `string` ; `id`: `string` ; `response`: `U`  }[] ; `type`: `string`  }[]

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
