# Class: EntityStorageAuthenticationService

Implementation of the authentication service using entity storage.

## Implements

- [`IAuthentication`](../interfaces/IAuthentication.md)

## Constructors

### new EntityStorageAuthenticationService()

> **new EntityStorageAuthenticationService**(`options`?): [`EntityStorageAuthenticationService`](EntityStorageAuthenticationService.md)

Create a new instance of EntityStorageAuthentication.

#### Parameters

• **options?**

The dependencies for the identity connector.

• **options.userEntityStorageType?**: `string`

The entity storage for the users, defaults to "authentication-user".

• **options.vaultConnectorType?**: `string`

The vault for the private keys, defaults to "vault".

• **options.config?**: [`IEntityStorageAuthenticationConfig`](../interfaces/IEntityStorageAuthenticationConfig.md)

The configuration for the authentication.

#### Returns

[`EntityStorageAuthenticationService`](EntityStorageAuthenticationService.md)

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

[`IAuthentication`](../interfaces/IAuthentication.md).[`CLASS_NAME`](../interfaces/IAuthentication.md#class_name)

## Methods

### bootstrap()

> **bootstrap**(`systemPartitionId`): `Promise`\<`void`\>

Bootstrap the service by creating and initializing any resources it needs.

#### Parameters

• **systemPartitionId**: `string`

The system partition id.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

[`IAuthentication`](../interfaces/IAuthentication.md).[`bootstrap`](../interfaces/IAuthentication.md#bootstrap)

***

### start()

> **start**(`systemPartitionId`): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Parameters

• **systemPartitionId**: `string`

The system partition id.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

[`IAuthentication`](../interfaces/IAuthentication.md).[`start`](../interfaces/IAuthentication.md#start)

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

#### Implementation of

[`IAuthentication`](../interfaces/IAuthentication.md).[`login`](../interfaces/IAuthentication.md#login)
