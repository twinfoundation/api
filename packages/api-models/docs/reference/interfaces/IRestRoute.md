# Interface: IRestRoute\<T, U\>

Interface which defines a REST route.

## Extends

- [`IBaseRoute`](IBaseRoute.md)

## Type Parameters

### T

`T` *extends* [`IHttpRequest`](IHttpRequest.md) = `any`

### U

`U` *extends* [`IHttpResponse`](IHttpResponse.md) & [`IRestRouteResponseOptions`](IRestRouteResponseOptions.md) = `any`

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

### summary

> **summary**: `string`

Summary of what task the operation performs.

***

### tag

> **tag**: `string`

Tag for the operation.

***

### method

> **method**: `HttpMethod`

The http method.

***

### handler()

> **handler**: (`httpRequestContext`, `request`) => `Promise`\<`U`\>

The handler module.

#### Parameters

##### httpRequestContext

[`IHttpRequestContext`](IHttpRequestContext.md)

The http request context.

##### request

`T`

The request object, combined query param, path params and body.

#### Returns

`Promise`\<`U`\>

***

### requestType?

> `optional` **requestType**: `object`

The type of the request object.

#### type

> **type**: `string`

The object type for the request.

#### mimeType?

> `optional` **mimeType**: `string`

The mime type of the request, defaults to "application/json" if there is a body.

#### examples?

> `optional` **examples**: [`IRestRouteRequestExample`](IRestRouteRequestExample.md)\<`T`\>[]

Example objects for the request.

***

### responseType?

> `optional` **responseType**: `object`[]

The type of the response object.

#### type

> **type**: `string`

The object type of the response.

#### mimeType?

> `optional` **mimeType**: `string`

The mime type of the response, defaults to "application/json" if there is a body.

#### examples?

> `optional` **examples**: [`IRestRouteResponseExample`](IRestRouteResponseExample.md)\<`U`\>[]

Example objects of the response.

***

### excludeFromSpec?

> `optional` **excludeFromSpec**: `boolean`

Exclude the route from being included in the spec file.
