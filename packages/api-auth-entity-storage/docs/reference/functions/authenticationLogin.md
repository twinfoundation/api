# Function: authenticationLogin()

> **authenticationLogin**(`requestContext`, `factoryServiceName`, `request`): `Promise`\<[`ILoginResponse`](../interfaces/ILoginResponse.md)\>

Login to the server.

## Parameters

• **requestContext**: `IHttpRequestContext`

The request context for the API.

• **factoryServiceName**: `string`

The name of the service to use in the routes.

• **request**: [`ILoginRequest`](../interfaces/ILoginRequest.md)

The request.

## Returns

`Promise`\<[`ILoginResponse`](../interfaces/ILoginResponse.md)\>

The response object with additional http response properties.
