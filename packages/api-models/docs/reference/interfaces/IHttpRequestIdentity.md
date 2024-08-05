# Interface: IHttpRequestIdentity

Context data from the HTTP request identity.

## Extended by

- [`IHttpRequestContext`](IHttpRequestContext.md)

## Properties

### systemIdentity?

> `optional` **systemIdentity**: `string`

The identity of the system the request is being performed on.

***

### userIdentity?

> `optional` **userIdentity**: `string`

The identity of the requestor if there is an authenticated user.
