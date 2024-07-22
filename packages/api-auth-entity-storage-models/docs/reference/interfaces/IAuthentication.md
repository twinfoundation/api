# Interface: IAuthentication

Contract definition for authentication service.

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

> `optional` **bootstrap**(`systemPartitionId`): `Promise`\<`void`\>

Bootstrap the service by creating and initializing any resources it needs.

#### Parameters

• **systemPartitionId**: `string`

The system partition id.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.bootstrap`

***

### start()?

> `optional` **start**(`systemPartitionId`): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Parameters

• **systemPartitionId**: `string`

The system partition id.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.start`

***

### stop()?

> `optional` **stop**(`systemPartitionId`): `Promise`\<`void`\>

The service needs to be stopped when the application is closed.

#### Parameters

• **systemPartitionId**: `string`

The system partition id.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.stop`

***

### login()

> **login**(`email`, `password`, `requestContext`?): `Promise`\<`string`\>

Perform a login for the user.

#### Parameters

• **email**: `string`

The email address for the user.

• **password**: `string`

The password for the user.

• **requestContext?**: `IServiceRequestContext`

The context for the request.

#### Returns

`Promise`\<`string`\>

The authentication token for the user.
