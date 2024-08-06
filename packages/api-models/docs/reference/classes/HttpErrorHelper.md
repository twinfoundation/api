# Class: HttpErrorHelper

Class to help with processing http errors.

## Constructors

### new HttpErrorHelper()

> **new HttpErrorHelper**(): [`HttpErrorHelper`](HttpErrorHelper.md)

#### Returns

[`HttpErrorHelper`](HttpErrorHelper.md)

## Methods

### processError()

> `static` **processError**(`err`, `includeStack`?): `object`

Process the errors from the routes.

#### Parameters

• **err**: `unknown`

The error to process.

• **includeStack?**: `boolean`

Should the stack be included in the error.

#### Returns

`object`

The status code and additional error data.

##### error

> **error**: `IError`

##### httpStatusCode

> **httpStatusCode**: `HttpStatusCode`

***

### buildResponse()

> `static` **buildResponse**(`response`, `error`, `statusCode`): `void`

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
