# Class: ResponseHelper

Helper class for building responses.

## Constructors

### new ResponseHelper()

> **new ResponseHelper**(): [`ResponseHelper`](ResponseHelper.md)

#### Returns

[`ResponseHelper`](ResponseHelper.md)

## Methods

### buildError()

> `static` **buildError**(`response`, `error`, `statusCode`): `void`

Build an error response.

#### Parameters

• **response**: [`IHttpResponse`](../interfaces/IHttpResponse.md)\<`any`\>

The response to build the error into.

• **error**: `IError`

The error to build the response for.

• **statusCode**: `HttpStatusCode`

The status code to use for the error.

#### Returns

`void`
