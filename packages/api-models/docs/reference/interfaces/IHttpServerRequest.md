# Interface: IHttpServerRequest\<T\>

Model for the standard parameters for an http request.

## Extends

- [`IHttpRequest`](IHttpRequest.md)\<`T`\>

## Type parameters

• **T** = `any`

## Properties

### headers?

> `optional` **headers**: `IHttpHeaders`

Incoming Http Headers.

#### Inherited from

[`IHttpRequest`](IHttpRequest.md).[`headers`](IHttpRequest.md#headers)

***

### pathParams?

> `optional` **pathParams**: [`IHttpRequestPathParams`](IHttpRequestPathParams.md)

The path parameters.

#### Inherited from

[`IHttpRequest`](IHttpRequest.md).[`pathParams`](IHttpRequest.md#pathparams)

***

### query?

> `optional` **query**: [`IHttpRequestQuery`](IHttpRequestQuery.md)

The query parameters.

#### Inherited from

[`IHttpRequest`](IHttpRequest.md).[`query`](IHttpRequest.md#query)

***

### body?

> `optional` **body**: `T`

Data to return send as the body.

#### Inherited from

[`IHttpRequest`](IHttpRequest.md).[`body`](IHttpRequest.md#body)

***

### method?

> `optional` **method**: `HttpMethod`

The request method.

***

### url?

> `optional` **url**: `string`

The request url.
