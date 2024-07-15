# Interface: INotFoundResponse

The resource you tried to access does not exist, see the error field for more details.

## Properties

### statusCode

> **statusCode**: `404`

Response status code.

***

### body

> **body**: `IError` & `object`

The body which contains the error.

#### Type declaration

##### notFoundId?

> `optional` **notFoundId**: `string`

The id if the item that was not found.
