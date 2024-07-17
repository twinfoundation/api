# Function: serverHealth()

> **serverHealth**(`requestContext`, `factoryServiceName`, `request`): `Promise`\<`IServerHealthResponse`\>

Get the health for the server.

## Parameters

• **requestContext**: `IHttpRequestContext`

The request context for the API.

• **factoryServiceName**: `string`

The name of the service to use in the routes.

• **request**: `INoContentRequest`

The request.

## Returns

`Promise`\<`IServerHealthResponse`\>

The response object with additional http response properties.
