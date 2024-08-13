# Interface: IHttpRequestContext

Context data from the HTTP request.

## Extends

- [`IHttpRequestIdentity`](IHttpRequestIdentity.md)

## Properties

### serverRequest

> **serverRequest**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The raw HTTP request.

***

### processorState

> **processorState**: `object`

The state handed through the processors.

#### Index signature

 \[`id`: `string`\]: `unknown`

***

### nodeIdentity?

> `optional` **nodeIdentity**: `string`

The identity of the node the request is being performed on.

#### Inherited from

[`IHttpRequestIdentity`](IHttpRequestIdentity.md).[`nodeIdentity`](IHttpRequestIdentity.md#nodeidentity)

***

### userIdentity?

> `optional` **userIdentity**: `string`

The identity of the requestor if there is an authenticated user.

#### Inherited from

[`IHttpRequestIdentity`](IHttpRequestIdentity.md).[`userIdentity`](IHttpRequestIdentity.md#useridentity)
