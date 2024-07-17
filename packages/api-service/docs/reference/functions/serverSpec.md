# Function: serverSpec()

> **serverSpec**(`requestContext`, `factoryServiceName`, `request`): `Promise`\<`IServerSpecResponse`\>

Get the spec for the server.

## Parameters

• **requestContext**: `IHttpRequestContext`

The request context for the API.

• **factoryServiceName**: `string`

The name of the service to use in the routes.

• **request**: `INoContentRequest`

The request.

## Returns

`Promise`\<`IServerSpecResponse`\>

The response object with additional http response properties.
