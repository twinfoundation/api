# Class: BaseRestClient

Abstract client class for common REST processing.

## Constructors

### constructor

• **new BaseRestClient**(`implementationName`, `config`, `pathPrefix`): [`BaseRestClient`](BaseRestClient.md)

Create a new instance of BaseRestClient.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `implementationName` | `string` | The name of the class implementation REST calls. |
| `config` | [`IBaseRestClientConfig`](../interfaces/IBaseRestClientConfig.md) | The configuration for the client. |
| `pathPrefix` | `string` | The default prefix to use if none in configuration. |

#### Returns

[`BaseRestClient`](BaseRestClient.md)

## Methods

### fetch

▸ **fetch**\<`T`, `U`\>(`requestContext`, `route`, `method`, `requestData?`): `Promise`\<`U`\>

Perform a request in json format.

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestContext` | `IRequestContext` | The context for the request. |
| `route` | `string` | The route of the request. |
| `method` | `HttpMethods` | The http method. |
| `requestData?` | `T` | Request to send to the endpoint. |

#### Returns

`Promise`\<`U`\>

The response.

___

### getEndpointWithPrefix

▸ **getEndpointWithPrefix**(): `string`

Get the endpoint with the prefix for the namespace.

#### Returns

`string`

The endpoint with namespace prefix attached.
