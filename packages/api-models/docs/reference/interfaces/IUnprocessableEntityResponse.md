# Interface: IUnprocessableEntityResponse

The operation could not be processed, see the error field for more details.

## Properties

### statusCode

> **statusCode**: `422`

Response status code.

***

### body

> **body**: `IError` & `object`

The body which contains the error.

#### Type declaration

##### existingId?

> `optional` **existingId**: `string`

The id which caused the unprocessable entity response.
