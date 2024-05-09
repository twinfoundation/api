# Interface: IHttpRequest\<T\>

Model for the standard parameters for an http request.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

## Properties

### body

• `Optional` **body**: `T`

Data to return send as the body.

___

### path

• `Optional` **path**: `Object`

The path parameters.

#### Index signature

▪ [id: `string`]: `string` \| `number` \| `boolean`

___

### query

• `Optional` **query**: [`IHttpRequestQuery`](IHttpRequestQuery.md)

The query parameters.
