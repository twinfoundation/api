# Function: serverHealth()

> **serverHealth**(`httpRequestContext`, `componentName`, `request`): `Promise`\<`IServerHealthResponse`\>

Get the health for the server.

## Parameters

• **httpRequestContext**: `IHttpRequestContext`

The request context for the API.

• **componentName**: `string`

The name of the component to use in the routes.

• **request**: `INoContentRequest`

The request.

## Returns

`Promise`\<`IServerHealthResponse`\>

The response object with additional http response properties.
