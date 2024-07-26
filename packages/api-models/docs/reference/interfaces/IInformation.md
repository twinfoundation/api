# Interface: IInformation

The information service for the server.

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

> `optional` **start**(`systemRequestContext`, `systemLoggingConnectorType`?): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Parameters

• **systemRequestContext**: `IServiceRequestContext`

The system request context.

• **systemLoggingConnectorType?**: `string`

The system logging connector type, defaults to "system-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.start`

***

### stop()?

> `optional` **stop**(`systemRequestContext`, `systemLoggingConnectorType`?): `Promise`\<`void`\>

The service needs to be stopped when the application is closed.

#### Parameters

• **systemRequestContext**: `IServiceRequestContext`

The system request context.

• **systemLoggingConnectorType?**: `string`

The system logging connector type, defaults to "system-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.stop`

***

### info()

> **info**(`requestContext`?): `Promise`\<[`IServerInfo`](IServerInfo.md)\>

Get the server information.

#### Parameters

• **requestContext?**: `IServiceRequestContext`

The context of the service request.

#### Returns

`Promise`\<[`IServerInfo`](IServerInfo.md)\>

The service information.

***

### spec()

> **spec**(`requestContext`?): `Promise`\<`unknown`\>

Get the OpenAPI spec.

#### Parameters

• **requestContext?**: `IServiceRequestContext`

The context of the service request.

#### Returns

`Promise`\<`unknown`\>

The OpenAPI spec.

***

### health()

> **health**(`requestContext`?): `Promise`\<[`IHealthInfo`](IHealthInfo.md)\>

Get the server health.

#### Parameters

• **requestContext?**: `IServiceRequestContext`

The context of the service request.

#### Returns

`Promise`\<[`IHealthInfo`](IHealthInfo.md)\>

The service health.

***

### setComponentHealth()

> **setComponentHealth**(`name`, `status`, `details`?, `requestContext`?): `Promise`\<`void`\>

Set the status of a component.

#### Parameters

• **name**: `string`

The component name.

• **status**: [`HealthStatus`](../type-aliases/HealthStatus.md)

The status of the component.

• **details?**: `string`

The details for the status.

• **requestContext?**: `IServiceRequestContext`

The context of the service request.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### removeComponentHealth()

> **removeComponentHealth**(`name`, `requestContext`?): `Promise`\<`void`\>

Remove the status of a component.

#### Parameters

• **name**: `string`

The component name.

• **requestContext?**: `IServiceRequestContext`

The context of the service request.

#### Returns

`Promise`\<`void`\>

Nothing.
