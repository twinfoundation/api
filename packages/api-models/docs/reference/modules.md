# @gtsc/api-models

## Classes

- [BaseRestClient](classes/BaseRestClient.md)
- [BaseSocketClient](classes/BaseSocketClient.md)

## Interfaces

- [IAcceptedResponse](interfaces/IAcceptedResponse.md)
- [IAuthConnector](interfaces/IAuthConnector.md)
- [IBaseRestClientConfig](interfaces/IBaseRestClientConfig.md)
- [IBaseRoute](interfaces/IBaseRoute.md)
- [IBaseSocketClientConfig](interfaces/IBaseSocketClientConfig.md)
- [IConflictResponse](interfaces/IConflictResponse.md)
- [ICreatedResponse](interfaces/ICreatedResponse.md)
- [IHttpRequest](interfaces/IHttpRequest.md)
- [IHttpRequestContext](interfaces/IHttpRequestContext.md)
- [IHttpRequestQuery](interfaces/IHttpRequestQuery.md)
- [IHttpResponse](interfaces/IHttpResponse.md)
- [INoContentResponse](interfaces/INoContentResponse.md)
- [INotFoundResponse](interfaces/INotFoundResponse.md)
- [IOkResponse](interfaces/IOkResponse.md)
- [IRestRoute](interfaces/IRestRoute.md)
- [ISocketRoute](interfaces/ISocketRoute.md)
- [ITag](interfaces/ITag.md)
- [IUnprocessableEntityResponse](interfaces/IUnprocessableEntityResponse.md)

## Type Aliases

### IBadRequestResponse

Ƭ **IBadRequestResponse**: [`IErrorResponse`](modules.md#ierrorresponse)

Something went wrong with the request see the error field for more details.

___

### IErrorResponse

Ƭ **IErrorResponse**: `IError`

Response to be used when returning an error.

___

### IForbiddenResponse

Ƭ **IForbiddenResponse**: [`IErrorResponse`](modules.md#ierrorresponse)

The operation that you tried to perform is not possible, see the error field for more details.

___

### IUnauthorizedResponse

Ƭ **IUnauthorizedResponse**: [`IErrorResponse`](modules.md#ierrorresponse)

You are not authorized to use the API or no credentials were supplied.
