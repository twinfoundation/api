# Interface: IHttpRequestContext

Context data from the HTTP request.

## Extends

- `IServiceRequestContext`

## Properties

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

***

### processorState

> **processorState**: `object`

The state handed through the processors.

#### Index signature

 \[`id`: `string`\]: `unknown`
