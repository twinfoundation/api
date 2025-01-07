# Function: serverInfo()

> **serverInfo**(`httpRequestContext`, `componentName`, `request`): `Promise`\<`IServerInfoResponse`\>

Get the information for the server.

## Parameters

### httpRequestContext

`IHttpRequestContext`

The request context for the API.

### componentName

`string`

The name of the component to use in the routes.

### request

`INoContentRequest`

The request.

## Returns

`Promise`\<`IServerInfoResponse`\>

The response object with additional http response properties.
