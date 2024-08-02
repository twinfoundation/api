# Function: authenticationLogout()

> **authenticationLogout**(`httpRequestContext`, `factoryServiceName`, `request`): `Promise`\<`INoContentResponse` & `IRestRouteResponseOptions`\>

Logout from the server.

## Parameters

• **httpRequestContext**: `IHttpRequestContext`

The request context for the API.

• **factoryServiceName**: `string`

The name of the service to use in the routes.

• **request**: `ILogoutRequest`

The request.

## Returns

`Promise`\<`INoContentResponse` & `IRestRouteResponseOptions`\>

The response object with additional http response properties.
