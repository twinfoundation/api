# Function: serverSpec()

> **serverSpec**(`httpRequestContext`, `componentName`, `request`): `Promise`\<`IServerSpecResponse`\>

Get the spec for the server.

## Parameters

• **httpRequestContext**: `IHttpRequestContext`

The request context for the API.

• **componentName**: `string`

The name of the component to use in the routes.

• **request**: `INoContentRequest`

The request.

## Returns

`Promise`\<`IServerSpecResponse`\>

The response object with additional http response properties.
