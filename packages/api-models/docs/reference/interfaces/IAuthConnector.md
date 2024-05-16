# Interface: IAuthConnector

Definition for a connector which can handle authorisation in the REST pipeline.

## Extends

- `IService`

## Methods

### bootstrap()?

> `optional` **bootstrap**(`requestContext`): `Promise`\<`void`\>

Bootstrap the service by creating and initializing any resources it needs.

#### Parameters

• **requestContext**: `IRequestContext`

The request context for bootstrapping.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.bootstrap`

***

### request()?

> `optional` **request**(`requestContext`, `route`, `headers`, `query`): `Promise`\<`void`\>

Process the request to check if the tenant has access to the API.

#### Parameters

• **requestContext**: `IRequestContext`

The context for the request.

• **route**: [`IBaseRoute`](IBaseRoute.md)

The route being requested.

• **headers**: `IHttpRequestHeaders`

The request headers.

• **query**: [`IHttpRequestQuery`](IHttpRequestQuery.md)

The request query params.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### response()?

> `optional` **response**(`requestContext`, `route`, `requestHeaders`, `response`): `Promise`\<`void`\>

Process the response to see if there are any additional headers to add.

#### Parameters

• **requestContext**: `IRequestContext`

The context for the request.

• **route**: [`IBaseRoute`](IBaseRoute.md)

The route being responded to.

• **requestHeaders**: `IHttpRequestHeaders`

The request headers.

• **response**: `object` & [`IHttpResponse`](IHttpResponse.md)\<`unknown`\>

The response.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### start()?

> `optional` **start**(): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.start`

***

### stop()?

> `optional` **stop**(): `Promise`\<`void`\>

The service needs to be stopped when the application is closed.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.stop`
