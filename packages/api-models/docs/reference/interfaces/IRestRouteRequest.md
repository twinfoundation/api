# Interface: IRestRouteRequest\<T\>

Interface which defines a REST route request.

## Type parameters

• **T** = `unknown`

## Properties

### path?

> `optional` **path**: `object`

The path parameters.

#### Index signature

 \[`id`: `string`\]: `string` \| `number` \| `boolean`

***

### query?

> `optional` **query**: [`IHttpRequestQuery`](IHttpRequestQuery.md)

The query parameters.

***

### body?

> `optional` **body**: `T`

Data to return send as the body.
