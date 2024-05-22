# Class: `abstract` BaseRestClient

Abstract client class for common REST processing.

## Constructors

### new BaseRestClient()

> **new BaseRestClient**(`implementationName`, `config`, `pathPrefix`): [`BaseRestClient`](BaseRestClient.md)

Create a new instance of BaseRestClient.

#### Parameters

• **implementationName**: `string`

The name of the class implementation REST calls.

• **config**: [`IBaseRestClientConfig`](../interfaces/IBaseRestClientConfig.md)

The configuration for the client.

• **pathPrefix**: `string`

The default prefix to use if none in configuration.

#### Returns

[`BaseRestClient`](BaseRestClient.md)

## Properties

### \_includeCredentials

> `private` `readonly` **\_includeCredentials**: `boolean`

Include credentials in the request, defaults to true.

## Methods

### getEndpointWithPrefix()

> **getEndpointWithPrefix**(): `string`

Get the endpoint with the prefix for the namespace.

#### Returns

`string`

The endpoint with namespace prefix attached.

***

### fetch()

> **fetch**\<`T`, `U`\>(`requestContext`, `route`, `method`, `request`?): `Promise`\<`U`\>

Perform a request in json format.

#### Type parameters

• **T** *extends* [`IHttpRequest`](../interfaces/IHttpRequest.md)\<`unknown`\>

• **U** *extends* [`IHttpResponse`](../interfaces/IHttpResponse.md)\<`unknown`\>

#### Parameters

• **requestContext**: `IRequestContext`

The context for the request.

• **route**: `string`

The route of the request.

• **method**: `HttpMethods`

The http method.

• **request?**: `T`

Request to send to the endpoint.

#### Returns

`Promise`\<`U`\>

The response.
