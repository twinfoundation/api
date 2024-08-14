# Function: authenticationLogout()

> **authenticationLogout**(`httpRequestContext`, `componentName`, `request`): `Promise`\<`INoContentResponse` & `IRestRouteResponseOptions`\>

Logout from the server.

## Parameters

• **httpRequestContext**: `IHttpRequestContext`

The request context for the API.

• **componentName**: `string`

The name of the component to use in the routes.

• **request**: `ILogoutRequest`

The request.

## Returns

`Promise`\<`INoContentResponse` & `IRestRouteResponseOptions`\>

The response object with additional http response properties.
