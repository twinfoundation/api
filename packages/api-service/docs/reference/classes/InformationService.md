# Class: InformationService

The information service for the server.

## Implements

- `IInformation`

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

`IInformation.CLASS_NAME`

## Methods

### start()

> **start**(): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IInformation.start`

***

### info()

> **info**(`requestContext`?): `Promise`\<`IServerInfo`\>

Get the server information.

#### Parameters

• **requestContext?**: `IServiceRequestContext`

The context of the service request.

#### Returns

`Promise`\<`IServerInfo`\>

The service information.

#### Implementation of

`IInformation.info`

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

#### Implementation of

`IInformation.spec`

***

### health()

> **health**(`requestContext`?): `Promise`\<`IHealthInfo`\>

Get the server health.

#### Parameters

• **requestContext?**: `IServiceRequestContext`

The context of the service request.

#### Returns

`Promise`\<`IHealthInfo`\>

The service health.

#### Implementation of

`IInformation.health`

***

### setComponentHealth()

> **setComponentHealth**(`name`, `status`, `details`?, `requestContext`?): `Promise`\<`void`\>

Set the status of a component.

#### Parameters

• **name**: `string`

The component name.

• **status**: `HealthStatus`

The status of the component.

• **details?**: `string`

The details for the status.

• **requestContext?**: `IServiceRequestContext`

The context of the service request.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IInformation.setComponentHealth`

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

#### Implementation of

`IInformation.removeComponentHealth`
