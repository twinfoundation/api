# Interface: IUnprocessableEntityResponse

The operation could not be processed, see the error field for more details.

## Hierarchy

- [`IErrorResponse`](../modules.md#ierrorresponse)

  ↳ **`IUnprocessableEntityResponse`**

## Properties

### existingId

• `Optional` **existingId**: `string`

The id which caused the unprocessable entity response.

___

### inner

• `Optional` **inner**: `IError`

The inner error if there was one.

#### Inherited from

IErrorResponse.inner

___

### message

• **message**: `string`

The message for the error.

#### Inherited from

IErrorResponse.message

___

### name

• **name**: `string`

The name for the error.

#### Inherited from

IErrorResponse.name

___

### properties

• `Optional` **properties**: `Object`

Any additional information for the error.

#### Index signature

▪ [id: `string`]: `unknown`

#### Inherited from

IErrorResponse.properties

___

### source

• `Optional` **source**: `string`

The source of the error.

#### Inherited from

IErrorResponse.source

___

### stack

• `Optional` **stack**: `string`

The stack trace for the error.

#### Inherited from

IErrorResponse.stack
