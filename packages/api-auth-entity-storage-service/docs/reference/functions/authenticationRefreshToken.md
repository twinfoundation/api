# Function: authenticationRefreshToken()

> **authenticationRefreshToken**(`httpRequestContext`, `factoryServiceName`, `request`): `Promise`\<`IRefreshTokenResponse` & `IRestRouteResponseOptions`\>

Refresh the login token.

## Parameters

• **httpRequestContext**: `IHttpRequestContext`

The request context for the API.

• **factoryServiceName**: `string`

The name of the service to use in the routes.

• **request**: `IRefreshTokenRequest`

The request.

## Returns

`Promise`\<`IRefreshTokenResponse` & `IRestRouteResponseOptions`\>

The response object with additional http response properties.
