# Function: serverHealth()

> **serverHealth**(`requestContext`, `factoryServiceName`, `request`): `Promise`\<[`IServerHealthResponse`](../interfaces/IServerHealthResponse.md)\>

Get the health for the server.

## Parameters

• **requestContext**: `IRequestContext`

The request context for the API.

• **factoryServiceName**: `string`

The name of the service to use in the routes.

• **request**: `unknown`

The request.

## Returns

`Promise`\<[`IServerHealthResponse`](../interfaces/IServerHealthResponse.md)\>

The response object with additional http response properties.
