# Interface: IRestRoute\<T, U\>

Interface which defines a REST route.

## Extends

- [`IBaseRoute`](IBaseRoute.md)

## Type parameters

• **T** = `any`

• **U** = `any`

## Properties

### handler()

> **handler**: (`requestContext`, `request`, `body`?) => `Promise`\<`U`\>

The handler module.

#### Parameters

• **requestContext**: [`IHttpRequestContext`](IHttpRequestContext.md)

The request context.

• **request**: `T`

The request object, combined query param, path params and body.

• **body?**: `unknown`

Body as standalone if it's a data request.

#### Returns

`Promise`\<`U`\>

***

### method

> **method**: `HttpMethods`

The http method.

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

### requestContentType?

> `optional` **requestContentType**: `object`[]

The request can have alternative content mime types.

***

### requestType?

> `optional` **requestType**: `object`

The type of the request object.

#### examples?

> `optional` **examples**: `object`[]

Example objects for the request.

#### type

> **type**: `string`

The object type for the request.

***

### responseContentType?

> `optional` **responseContentType**: `object`[]

The response can have alternative content mime types.

***

### responseType?

> `optional` **responseType**: `object`[]

The type of the response object.

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

***

### summary

> **summary**: `string`

Summary of what task the operation performs.

***

### tag

> **tag**: `string`

Tag for the operation.
