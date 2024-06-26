# Class: InformationService

The information service for the server.

## Implements

- `IService`

## Constructors

### new InformationService()

> **new InformationService**(`serverInfo`): [`InformationService`](InformationService.md)

Create a new instance of InformationService.

#### Parameters

• **serverInfo**: [`IServerInfo`](../interfaces/IServerInfo.md)

The server information.

#### Returns

[`InformationService`](InformationService.md)

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

#### Implementation of

`IService.bootstrap`

***

### serverInformation()

> **serverInformation**(): `Promise`\<[`IServerInfo`](../interfaces/IServerInfo.md)\>

Get the server information.

#### Returns

`Promise`\<[`IServerInfo`](../interfaces/IServerInfo.md)\>

The service information.

***

### serverHealth()

> **serverHealth**(): `Promise`\<[`IServerHealth`](../interfaces/IServerHealth.md)\>

Get the server health.

#### Returns

`Promise`\<[`IServerHealth`](../interfaces/IServerHealth.md)\>

The service health.

***

### setComponentHealth()

> **setComponentHealth**(`name`, `status`, `details`?): `Promise`\<`void`\>

Set the status of a component.

#### Parameters

• **name**: `string`

The component name.

• **status**: [`ServerHealthStatus`](../type-aliases/ServerHealthStatus.md)

The status of the component.

• **details?**: `string`

The details for the status.

#### Returns

`Promise`\<`void`\>

***

### removeComponentHealth()

> **removeComponentHealth**(`name`): `Promise`\<`void`\>

Remove the status of a component.

#### Parameters

• **name**: `string`

The component name.

#### Returns

`Promise`\<`void`\>
