# Interface: IHttpRequest\<T\>

Model for the standard parameters for an http request.

## Extended by

- [`IHttpServerRequest`](IHttpServerRequest.md)
- [`INoContentRequest`](INoContentRequest.md)

## Type Parameters

• **T** = `any`

## Properties

### headers?

> `optional` **headers**: `IHttpHeaders`

Incoming Http Headers.

***

### pathParams?

> `optional` **pathParams**: [`IHttpRequestPathParams`](IHttpRequestPathParams.md)

The path parameters.

***

### query?

> `optional` **query**: [`IHttpRequestQuery`](IHttpRequestQuery.md)

The query parameters.

***

### body?

> `optional` **body**: `T`

Data to return send as the body.
