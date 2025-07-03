# Function: authenticationRefreshToken()

> **authenticationRefreshToken**(`httpRequestContext`, `componentName`, `request`): `Promise`\<`IRefreshTokenResponse` & `IRestRouteResponseOptions`\>

Refresh the login token.

## Parameters

### httpRequestContext

`IHttpRequestContext`

The request context for the API.

### componentName

`string`

The name of the component to use in the routes.

### request

`IRefreshTokenRequest`

The request.

## Returns

`Promise`\<`IRefreshTokenResponse` & `IRestRouteResponseOptions`\>

The response object with additional http response properties.
