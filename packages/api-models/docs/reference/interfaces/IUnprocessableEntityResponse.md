# Interface: IUnprocessableEntityResponse

The operation could not be processed, see the error field for more details.

## Extends

- [`IErrorResponse`](../type-aliases/IErrorResponse.md)

## Properties

### existingId?

> `optional` **existingId**: `string`

The id which caused the unprocessable entity response.

***

### inner?

> `optional` **inner**: `IError`

The inner error if there was one.

#### Inherited from

`IErrorResponse.inner`

***

### message

> **message**: `string`

The message for the error.

#### Inherited from

`IErrorResponse.message`

***

### name

> **name**: `string`

The name for the error.

#### Inherited from

`IErrorResponse.name`

***

### properties?

> `optional` **properties**: `object`

Any additional information for the error.

#### Index signature

 \[`id`: `string`\]: `unknown`

#### Inherited from

`IErrorResponse.properties`

***

### source?

> `optional` **source**: `string`

The source of the error.

#### Inherited from

`IErrorResponse.source`

***

### stack?

> `optional` **stack**: `string`

The stack trace for the error.

#### Inherited from

`IErrorResponse.stack`
