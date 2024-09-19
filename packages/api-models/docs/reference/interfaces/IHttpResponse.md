# Interface: IHttpResponse\<T\>

Model for the standard parameters for an http response.

## Type Parameters

• **T** = `any`

## Properties

### statusCode?

> `optional` **statusCode**: `HttpStatusCode`

Response status code.

***

### headers?

> `optional` **headers**: `IHttpHeaders`

Response headers.

***

### body?

> `optional` **body**: `T`

Data to return as the main payload.
