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

> `optional` **bootstrap**(`systemLoggingConnectorType`?): `Promise`\<`void`\>

Bootstrap the service by creating and initializing any resources it needs.

#### Parameters

• **systemLoggingConnectorType?**: `string`

The system logging connector type, defaults to "system-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.bootstrap`

***

### start()?

> `optional` **start**(`systemIdentity`, `systemLoggingConnectorType`?): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Parameters

• **systemIdentity**: `string`

The identity of the system.

• **systemLoggingConnectorType?**: `string`

The system logging connector type, defaults to "system-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.start`

***

### stop()?

> `optional` **stop**(`systemIdentity`, `systemLoggingConnectorType`?): `Promise`\<`void`\>

The service needs to be stopped when the application is closed.

#### Parameters

• **systemIdentity**: `string`

The identity of the system.

• **systemLoggingConnectorType?**: `string`

The system logging connector type, defaults to "system-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.stop`

***

### pre()?

> `optional` **pre**(`request`, `response`, `route`, `requestIdentity`, `processorState`): `Promise`\<`void`\>

Pre process the REST request for the specified route.

#### Parameters

• **request**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The request to handle.

• **response**: [`IHttpResponse`](IHttpResponse.md)\<`any`\>

The response data to send if any.

• **route**: `undefined` \| [`IRestRoute`](IRestRoute.md)\<`any`, `any`\>

The route being requested, if a matching one was found.

• **requestIdentity**: [`IHttpRequestIdentity`](IHttpRequestIdentity.md)

The identity context for the request.

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.

***

### process()?

> `optional` **process**(`request`, `response`, `route`, `requestIdentity`, `processorState`): `Promise`\<`void`\>

Process the REST request for the specified route.

#### Parameters

• **request**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The request to handle.

• **response**: [`IHttpResponse`](IHttpResponse.md)\<`any`\>

The response data to send if any.

• **route**: `undefined` \| [`IRestRoute`](IRestRoute.md)\<`any`, `any`\>

The route being requested, if a matching one was found.

• **requestIdentity**: [`IHttpRequestIdentity`](IHttpRequestIdentity.md)

The identity context for the request.

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.

***

### post()?

> `optional` **post**(`request`, `response`, `route`, `requestIdentity`, `processorState`): `Promise`\<`void`\>

Post process the REST request for the specified route.

#### Parameters

• **request**: [`IHttpServerRequest`](IHttpServerRequest.md)\<`any`\>

The request to handle.

• **response**: [`IHttpResponse`](IHttpResponse.md)\<`any`\>

The response data to send if any.

• **route**: `undefined` \| [`IRestRoute`](IRestRoute.md)\<`any`, `any`\>

The route being requested, if a matching one was found.

• **requestIdentity**: [`IHttpRequestIdentity`](IHttpRequestIdentity.md)

The identity context for the request.

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

Promise that resolves when the request is processed.
