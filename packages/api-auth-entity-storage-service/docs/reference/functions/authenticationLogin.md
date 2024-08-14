# Function: authenticationLogin()

> **authenticationLogin**(`httpRequestContext`, `componentName`, `request`): `Promise`\<`ILoginResponse` & `IRestRouteResponseOptions`\>

Login to the server.

## Parameters

• **httpRequestContext**: `IHttpRequestContext`

The request context for the API.

• **componentName**: `string`

The name of the component to use in the routes.

• **request**: `ILoginRequest`

The request.

## Returns

`Promise`\<`ILoginResponse` & `IRestRouteResponseOptions`\>

The response object with additional http response properties.
