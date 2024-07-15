# Interface: IHttpRequestContext

Context data from the HTTP request.

## Extends

- `IServiceRequestContext`

## Properties

### partitionId?

> `optional` **partitionId**: `string`

The id for partitioning data, usually correlated from the api key making the request.

#### Inherited from

`IServiceRequestContext.partitionId`

***

### identity?

> `optional` **identity**: `string`

The identity of the requestor if there is an authenticated user.

#### Inherited from

`IServiceRequestContext.identity`

***

### serverRequest

> **serverRequest**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The raw HTTP request.
