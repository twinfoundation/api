# Function: authenticationLogin()

> **authenticationLogin**(`httpRequestContext`, `factoryServiceName`, `request`): `Promise`\<`ILoginResponse` & `IRestRouteResponseOptions`\>

Login to the server.

## Parameters

• **httpRequestContext**: `IHttpRequestContext`

The request context for the API.

• **factoryServiceName**: `string`

The name of the service to use in the routes.

• **request**: `ILoginRequest`

The request.

## Returns

`Promise`\<`ILoginResponse` & `IRestRouteResponseOptions`\>

The response object with additional http response properties.
