# Class: InformationService

The information service for the server.

## Implements

- `IInformationService`

## Constructors

### new InformationService()

> **new InformationService**(`serverInfo`, `openApiSpecPath`?): [`InformationService`](InformationService.md)

Create a new instance of InformationService.

#### Parameters

• **serverInfo**: `IServerInfo`

The server information.

• **openApiSpecPath?**: `string`

The path to the spec file.

#### Returns

[`InformationService`](InformationService.md)

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IInformationService.CLASS_NAME`

## Methods

### start()

> **start**(): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IInformationService.start`

***

### info()

> **info**(): `Promise`\<`IServerInfo`\>

Get the server information.

#### Returns

`Promise`\<`IServerInfo`\>

The service information.

#### Implementation of

`IInformationService.info`

***

### spec()

> **spec**(): `Promise`\<`unknown`\>

Get the OpenAPI spec.

#### Returns

`Promise`\<`unknown`\>

The OpenAPI spec.

#### Implementation of

`IInformationService.spec`

***

### health()

> **health**(): `Promise`\<`IHealthInfo`\>

Get the server health.

#### Returns

`Promise`\<`IHealthInfo`\>

The service health.

#### Implementation of

`IInformationService.health`

***

### setComponentHealth()

> **setComponentHealth**(`name`, `status`, `details`?): `Promise`\<`void`\>

Set the status of a component.

#### Parameters

• **name**: `string`

The component name.

• **status**: `HealthStatus`

The status of the component.

• **details?**: `string`

The details for the status.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IInformationService.setComponentHealth`

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

#### Implementation of

`IInformationService.removeComponentHealth`
