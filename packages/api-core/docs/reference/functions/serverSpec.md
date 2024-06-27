# Function: serverSpec()

> **serverSpec**(`requestContext`, `factoryServiceName`, `request`): `Promise`\<[`IServerSpecResponse`](../interfaces/IServerSpecResponse.md)\>

Get the spec for the server.

## Parameters

• **requestContext**: `IRequestContext`

The request context for the API.

• **factoryServiceName**: `string`

The name of the service to use in the routes.

• **request**: `unknown`

The request.

## Returns

`Promise`\<[`IServerSpecResponse`](../interfaces/IServerSpecResponse.md)\>

The response object with additional http response properties.
