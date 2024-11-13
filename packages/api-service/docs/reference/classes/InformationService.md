# Class: InformationService

The information service for the server.

## Implements

- `IInformationComponent`

## Constructors

### new InformationService()

> **new InformationService**(`options`): [`InformationService`](InformationService.md)

Create a new instance of InformationService.

#### Parameters

• **options**

The options to create the service.

• **options.config**: [`IInformationServiceConfig`](../interfaces/IInformationServiceConfig.md)

The configuration for the service.

#### Returns

[`InformationService`](InformationService.md)

## Properties

### NAMESPACE

> `readonly` `static` **NAMESPACE**: `string` = `"information"`

The namespace supported by the information service.

***

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IInformationComponent.CLASS_NAME`

## Methods

### start()

> **start**(): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IInformationComponent.start`

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

`IInformationComponent.setComponentHealth`

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

`IInformationComponent.removeComponentHealth`
