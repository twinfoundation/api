# Interface: IHttpResponse\<T\>

Model for the standard parameters for an http response.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

## Properties

### body

• `Optional` **body**: `T`

Data to return as the main payload.

___

### headers

• `Optional` **headers**: `IHttpRequestHeaders`

Response headers.

___

### statusCode

• `Optional` **statusCode**: `HttpStatusCodes`

Response status code.
