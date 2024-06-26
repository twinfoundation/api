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

the service information.
