# Function: authenticationLogin()

> **authenticationLogin**(`requestContext`, `factoryServiceName`, `request`): `Promise`\<`ILoginResponse`\>

Login to the server.

## Parameters

• **requestContext**: `IHttpRequestContext`

The request context for the API.

• **factoryServiceName**: `string`

The name of the service to use in the routes.

• **request**: `ILoginRequest`

The request.

## Returns

`Promise`\<`ILoginResponse`\>

The response object with additional http response properties.
