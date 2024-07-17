# Function: serverInfo()

> **serverInfo**(`requestContext`, `factoryServiceName`, `request`): `Promise`\<`IServerInfoResponse`\>

Get the information for the server.

## Parameters

• **requestContext**: `IHttpRequestContext`

The request context for the API.

• **factoryServiceName**: `string`

The name of the service to use in the routes.

• **request**: `INoContentRequest`

The request.

## Returns

`Promise`\<`IServerInfoResponse`\>

The response object with additional http response properties.
