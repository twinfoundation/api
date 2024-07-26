# Class: EntityStorageAuthenticationService

Implementation of the authentication service using entity storage.

## Implements

- `IAuthentication`

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

• **options.config?**: [`IEntityStorageAuthenticationServiceConfig`](../interfaces/IEntityStorageAuthenticationServiceConfig.md)

The configuration for the authentication.

#### Returns

[`EntityStorageAuthenticationService`](EntityStorageAuthenticationService.md)

## Properties

### \_DEFAULT\_TTL

> `static` `private` `readonly` **\_DEFAULT\_TTL**: `number` = `1440`

Default TTL in minutes 1440 is 24 hours.

***

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IAuthentication.CLASS_NAME`

## Methods

### start()

> **start**(`systemRequestContext`, `systemLoggingConnectorType`?): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Parameters

• **systemRequestContext**: `IServiceRequestContext`

The system request context.

• **systemLoggingConnectorType?**: `string`

The system logging connector type, defaults to "system-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IAuthentication.start`

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

`IAuthentication.login`
