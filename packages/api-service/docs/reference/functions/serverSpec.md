# Function: serverSpec()

> **serverSpec**(`httpRequestContext`, `factoryServiceName`, `request`): `Promise`\<`IServerSpecResponse`\>

Get the spec for the server.

## Parameters

• **httpRequestContext**: `IHttpRequestContext`

The request context for the API.

• **factoryServiceName**: `string`

The name of the service to use in the routes.

• **request**: `INoContentRequest`

The request.

## Returns

`Promise`\<`IServerSpecResponse`\>

The response object with additional http response properties.
