# Class: EntityStorageAuthenticationService

Implementation of the authentication component using entity storage.

## Implements

- `IAuthenticationComponent`

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

### NAMESPACE

> `readonly` `static` **NAMESPACE**: `string` = `"authentication-entity-storage"`

The namespace supported by the authentication service.

***

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IAuthenticationComponent.CLASS_NAME`

## Methods

### start()

> **start**(`nodeIdentity`, `nodeLoggingConnectorType`?): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Parameters

• **nodeIdentity**: `string`

The identity of the node.

• **nodeLoggingConnectorType?**: `string`

The node logging connector type, defaults to "node-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IAuthenticationComponent.start`

***

### login()

> **login**(`email`, `password`): `Promise`\<`object`\>

Perform a login for the user.

#### Parameters

• **email**: `string`

The email address for the user.

• **password**: `string`

The password for the user.

#### Returns

`Promise`\<`object`\>

The authentication token for the user, if it uses a mechanism with public access.

##### token?

> `optional` **token**: `string`

##### expiry

> **expiry**: `number`

#### Implementation of

`IAuthenticationComponent.login`

***

### logout()

> **logout**(`token`?): `Promise`\<`void`\>

Logout the current user.

#### Parameters

• **token?**: `string`

The token to logout, if it uses a mechanism with public access.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IAuthenticationComponent.logout`

***

### refresh()

> **refresh**(`token`?): `Promise`\<`object`\>

Refresh the token.

#### Parameters

• **token?**: `string`

The token to refresh, if it uses a mechanism with public access.

#### Returns

`Promise`\<`object`\>

The refreshed token, if it uses a mechanism with public access.

##### token

> **token**: `string`

##### expiry

> **expiry**: `number`

#### Implementation of

`IAuthenticationComponent.refresh`
