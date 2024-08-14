# Interface: IInformationComponent

The information component for the server.

## Extends

- `IComponent`

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

The name of the component.

#### Inherited from

`IComponent.CLASS_NAME`

## Methods

### bootstrap()?

> `optional` **bootstrap**(`nodeLoggingConnectorType`?): `Promise`\<`boolean`\>

Bootstrap the component by creating and initializing any resources it needs.

#### Parameters

• **nodeLoggingConnectorType?**: `string`

The node logging connector type, defaults to "node-logging".

#### Returns

`Promise`\<`boolean`\>

True if the bootstrapping process was successful.

#### Inherited from

`IComponent.bootstrap`

***

### start()?

> `optional` **start**(`nodeIdentity`, `nodeLoggingConnectorType`?): `Promise`\<`void`\>

The component needs to be started when the node is initialized.

#### Parameters

• **nodeIdentity**: `string`

The identity of the node starting the component.

• **nodeLoggingConnectorType?**: `string`

The node logging connector type, defaults to "node-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IComponent.start`

***

### stop()?

> `optional` **stop**(`nodeIdentity`, `nodeLoggingConnectorType`?): `Promise`\<`void`\>

The component needs to be stopped when the node is closed.

#### Parameters

• **nodeIdentity**: `string`

The identity of the node stopping the component.

• **nodeLoggingConnectorType?**: `string`

The node logging connector type, defaults to "node-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IComponent.stop`

***

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

> **setComponentHealth**(`name`, `status`, `details`?): `Promise`\<`void`\>

Set the status of a component.

#### Parameters

• **name**: `string`

The component name.

• **status**: [`HealthStatus`](../type-aliases/HealthStatus.md)

The status of the component.

• **details?**: `string`

The details for the status.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### removeComponentHealth()

> **removeComponentHealth**(`name`): `Promise`\<`void`\>

Remove the status of a component.

#### Parameters

• **name**: `string`

The component name.

#### Returns

`Promise`\<`void`\>

Nothing.
