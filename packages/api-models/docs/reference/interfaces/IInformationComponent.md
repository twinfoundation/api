# Interface: IInformationComponent

The information component for the server.

## Extends

- `IComponent`

## Methods

### info()

> **info**(): `Promise`\<[`IServerInfo`](IServerInfo.md)\>

Get the server information.

#### Returns

`Promise`\<[`IServerInfo`](IServerInfo.md)\>

The service information.

***

### spec()

> **spec**(): `Promise`\<`unknown`\>

Get the OpenAPI spec.

#### Returns

`Promise`\<`unknown`\>

The OpenAPI spec.

***

### health()

> **health**(): `Promise`\<[`IHealthInfo`](IHealthInfo.md)\>

Get the server health.

#### Returns

`Promise`\<[`IHealthInfo`](IHealthInfo.md)\>

The service health.

***

### setComponentHealth()

> **setComponentHealth**(`name`, `status`, `details?`): `Promise`\<`void`\>

Set the status of a component.

#### Parameters

##### name

`string`

The component name.

##### status

[`HealthStatus`](../type-aliases/HealthStatus.md)

The status of the component.

##### details?

`string`

The details for the status.

#### Returns

`Promise`\<`void`\>

Nothing.

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
