# Interface: IConflictResponse

The request resulted in a conflicting operation, see the content for more details.

## Properties

### statusCode

> **statusCode**: `409`

Response status code.

***

### body

> **body**: `IError` & `object`

The body which contains the error.

#### Type declaration

##### conflicts

> **conflicts**: `string`[]

The conflicting items.
