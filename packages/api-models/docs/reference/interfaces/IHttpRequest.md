# Interface: IHttpRequest\<T\>

Model for the standard parameters for an http request.

## Type parameters

• **T** = `unknown`

## Properties

### method?

> `optional` **method**: `HttpMethods`

The request method.

***

### url?

> `optional` **url**: `string`

The request url.

***

### headers?

> `optional` **headers**: `IHttpRequestHeaders`

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
