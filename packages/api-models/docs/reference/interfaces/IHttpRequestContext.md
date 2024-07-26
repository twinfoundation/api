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

### systemIdentity?

> `optional` **systemIdentity**: `string`

The identity of the system the request is being performed on.

#### Inherited from

`IServiceRequestContext.systemIdentity`

***

### userIdentity?

> `optional` **userIdentity**: `string`

The identity of the requestor if there is an authenticated user.

#### Inherited from

`IServiceRequestContext.userIdentity`

***

### serverRequest

> **serverRequest**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The raw HTTP request.
