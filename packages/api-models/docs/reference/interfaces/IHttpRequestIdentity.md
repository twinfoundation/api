# Interface: IHttpRequestIdentity

Context data from the HTTP request identity.

## Extended by

- [`IHttpRequestContext`](IHttpRequestContext.md)

## Properties

### nodeIdentity?

> `optional` **nodeIdentity**: `string`

The identity of the node the request is being performed on.

***

### userIdentity?

> `optional` **userIdentity**: `string`

The identity of the requestor if there is an authenticated user.
