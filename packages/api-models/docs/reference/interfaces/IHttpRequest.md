# Interface: IHttpRequest

Model used when a REST route wants to return custom response.

## Indexable

▪ [id: `string`]: `unknown`

The path parameters.

## Properties

### data

• `Optional` **data**: `unknown`

Data to return as the main payload.

___

### query

• `Optional` **query**: [`IHttpRequestQuery`](IHttpRequestQuery.md)

Request headers.

___

### rawUrl

• **rawUrl**: `URL`

The raw url.
