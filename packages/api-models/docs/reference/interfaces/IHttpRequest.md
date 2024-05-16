# Interface: IHttpRequest\<T\>

Model for the standard parameters for an http request.

## Type parameters

• **T** = `unknown`

## Properties

### body?

> `optional` **body**: `T`

Data to return send as the body.

***

### path?

> `optional` **path**: `object`

The path parameters.

#### Index signature

 \[`id`: `string`\]: `string` \| `number` \| `boolean`

***

### query?

> `optional` **query**: [`IHttpRequestQuery`](IHttpRequestQuery.md)

The query parameters.
