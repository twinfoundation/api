# Class: InformationService

The information service for the server.

## Implements

- `IService`

## Constructors

### new InformationService()

> **new InformationService**(`serverInfo`, `openApiSpecPath`?): [`InformationService`](InformationService.md)

Create a new instance of InformationService.

#### Parameters

• **serverInfo**: [`IServerInfo`](../interfaces/IServerInfo.md)

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

`IService.CLASS_NAME`

## Methods

### serverInformation()

> **serverInformation**(): [`IServerInfo`](../interfaces/IServerInfo.md)

Get the server information.

#### Returns

[`IServerInfo`](../interfaces/IServerInfo.md)

The service information.

***

### openApiSpecPath()

> **openApiSpecPath**(): `undefined` \| `string`

Get the path to the OpenAPI spec.

#### Returns

`undefined` \| `string`

The OpenAPI spec path.

***

### serverHealth()

> **serverHealth**(): [`IServerHealth`](../interfaces/IServerHealth.md)

Get the server health.

#### Returns

[`IServerHealth`](../interfaces/IServerHealth.md)

The service health.

***

### setComponentHealth()

> **setComponentHealth**(`name`, `status`, `details`?): `void`

Set the status of a component.

#### Parameters

• **name**: `string`

The component name.

• **status**: [`ServerHealthStatus`](../type-aliases/ServerHealthStatus.md)

The status of the component.

• **details?**: `string`

The details for the status.

#### Returns

`void`

***

### removeComponentHealth()

> **removeComponentHealth**(`name`): `void`

Remove the status of a component.

#### Parameters

• **name**: `string`

The component name.

#### Returns

`void`
