# Interface: IHttpResponse\<T\>

Model for the standard parameters for an http response.

## Type parameters

• **T** = `unknown`

## Properties

### body?

> `optional` **body**: `T`

Data to return as the main payload.

***

### headers?

> `optional` **headers**: `IHttpRequestHeaders`

Response headers.

***

### statusCode?

> `optional` **statusCode**: `HttpStatusCodes`

Response status code.
