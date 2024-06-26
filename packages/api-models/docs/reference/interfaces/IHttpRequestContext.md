# Interface: IHttpRequestContext

Context data from the HTTP request.

## Extends

- `IRequestContext`

## Properties

### locale?

> `optional` **locale**: `string`

The locale of the context as a code e.g. es-ES, defaults to en.

#### Inherited from

`IRequestContext.locale`

***

### tenantId?

> `optional` **tenantId**: `string`

The tenant id for partitioning data, correlated from the api key making the request.

#### Inherited from

`IRequestContext.tenantId`

***

### identity?

> `optional` **identity**: `string`

The identity of the requestor if there is an authenticated user.

#### Inherited from

`IRequestContext.identity`

***

### request

> **request**: [`IHttpRequest`](IHttpRequest.md)\<`unknown`\>

The full HTTP request.
