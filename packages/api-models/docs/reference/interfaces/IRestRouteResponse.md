# Interface: IRestRouteResponse\<T\>

Interface which defines a REST route response.

## Type parameters

• **T** = `unknown`

## Properties

### statusCode?

> `optional` **statusCode**: `HttpStatusCodes`

Response status code.

***

### headers?

> `optional` **headers**: `IHttpRequestHeaders`

Response headers.

***

### body?

> `optional` **body**: `T`

Data to return as the main payload.

***

### options?

> `optional` **options**: `object`

Additional options that can be used to control the response.

#### mimeType?

> `optional` **mimeType**: `string`

The content type to use in the response.

#### filename?

> `optional` **filename**: `string`

The filename to use in content disposition.

#### inline?

> `optional` **inline**: `boolean`

Whether to inline the content.
