# Function: serverInfo()

> **serverInfo**(`requestContext`, `factoryServiceName`, `request`): `Promise`\<[`IServerInfoResponse`](../interfaces/IServerInfoResponse.md)\>

Get the information for the server.

## Parameters

• **requestContext**: `IHttpRequestContext`

The request context for the API.

• **factoryServiceName**: `string`

The name of the service to use in the routes.

• **request**: `INoContentRequest`

The request.

## Returns

`Promise`\<[`IServerInfoResponse`](../interfaces/IServerInfoResponse.md)\>

The response object with additional http response properties.
