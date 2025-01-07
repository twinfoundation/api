# Class: InformationClient

The client to connect to the information service.

## Extends

- `BaseRestClient`

## Implements

- `IInformationComponent`

## Constructors

### new InformationClient()

> **new InformationClient**(`config`): [`InformationClient`](InformationClient.md)

Create a new instance of InformationClient.

#### Parameters

##### config

`IBaseRestClientConfig`

The configuration for the client.

#### Returns

[`InformationClient`](InformationClient.md)

#### Overrides

`BaseRestClient.constructor`

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IInformationComponent.CLASS_NAME`

## Methods

### getEndpointWithPrefix()

> **getEndpointWithPrefix**(): `string`

Get the endpoint with the prefix for the namespace.

#### Returns

`string`

The endpoint with namespace prefix attached.

#### Inherited from

`BaseRestClient.getEndpointWithPrefix`

***

### fetch()

> **fetch**\<`T`, `U`\>(`route`, `method`, `request`?): `Promise`\<`U`\>

Perform a request in json format.

#### Type Parameters

• **T** *extends* `IHttpRequest`

• **U** *extends* `IHttpResponse`

#### Parameters

##### route

`string`

The route of the request.

##### method

`HttpMethod`

The http method.

##### request?

`T`

Request to send to the endpoint.

#### Returns

`Promise`\<`U`\>

The response.

#### Inherited from

`BaseRestClient.fetch`

***

### info()

> **info**(): `Promise`\<`IServerInfo`\>

Get the server information.

#### Returns

`Promise`\<`IServerInfo`\>

The service information.

#### Implementation of

`IInformationComponent.info`

***

### spec()

> **spec**(): `Promise`\<`unknown`\>

Get the OpenAPI spec.

#### Returns

`Promise`\<`unknown`\>

The OpenAPI spec.

#### Implementation of

`IInformationComponent.spec`

***

### health()

> **health**(): `Promise`\<`IHealthInfo`\>

Get the server health.

#### Returns

`Promise`\<`IHealthInfo`\>

The service health.

#### Implementation of

`IInformationComponent.health`

***

### setComponentHealth()

> **setComponentHealth**(`name`, `status`, `details`?): `Promise`\<`void`\>

Set the status of a component.

#### Parameters

##### name

`string`

The component name.

##### status

`HealthStatus`

The status of the component.

##### details?

`string`

The details for the status.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IInformationComponent.setComponentHealth`

***

### removeComponentHealth()

> **removeComponentHealth**(`name`): `Promise`\<`void`\>

Remove the status of a component.

#### Parameters

##### name

`string`

The component name.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IInformationComponent.removeComponentHealth`
