# Interface: IHttpResponse\<T\>

Model used when a REST route wants to return custom response.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

## Properties

### data

• `Optional` **data**: `T`

Data to return as the main payload.

___

### headers

• `Optional` **headers**: `IHttpRequestHeaders`

Additional response headers.

___

### statusCode

• `Optional` **statusCode**: `HttpStatusCodes`

Alternative response status code.
