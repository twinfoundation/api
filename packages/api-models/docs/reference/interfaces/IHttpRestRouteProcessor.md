# Interface: IHttpRestRouteProcessor

The definition for a processor for handling REST routes.

## Extends

- `IService`

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

The name of the service.

#### Inherited from

`IService.CLASS_NAME`

## Methods

### bootstrap()?

> `optional` **bootstrap**(`systemPartitionId`): `Promise`\<`void`\>

Bootstrap the service by creating and initializing any resources it needs.

#### Parameters

• **systemPartitionId**: `string`

The system partition id.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.bootstrap`

***

### start()?

> `optional` **start**(`systemPartitionId`): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Parameters

• **systemPartitionId**: `string`

The system partition id.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.start`

***

### stop()?

> `optional` **stop**(`systemPartitionId`): `Promise`\<`void`\>

The service needs to be stopped when the application is closed.

#### Parameters

• **systemPartitionId**: `string`

The system partition id.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.stop`

***

### process()

> **process**(`request`, `response`, `route`, `requestContext`, `state`): `Promise`\<`void`\>

Process the REST request for the specified route.

#### Parameters

• **request**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The request to handle.

• **response**: [`IHttpResponse`](IHttpResponse.md)\<`any`\>

The response data to send if any.

• **route**: `undefined` \| [`IRestRoute`](IRestRoute.md)\<`any`, `any`\>

The route being requested, if a matching one was found.

• **requestContext**: `IServiceRequestContext`

The context for the request.

• **state**

The state for the request.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.
