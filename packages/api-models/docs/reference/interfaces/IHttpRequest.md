# Interface: IHttpRequest\<T\>

Model for the standard parameters for an http request.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

## Properties

### data

• `Optional` **data**: `T`

Data to return as the main payload.

___

### path

• **path**: `Object`

The path parameters.

#### Index signature

▪ [id: `string`]: `string` \| `number` \| `boolean`

___

### query

• `Optional` **query**: [`IHttpRequestQuery`](IHttpRequestQuery.md)

Request headers.
