# Class: EntityStorageAuthenticationService

Implementation of the authentication component using entity storage.

## Implements

- `IAuthenticationComponent`

## Constructors

### new EntityStorageAuthenticationService()

> **new EntityStorageAuthenticationService**(`options`?): [`EntityStorageAuthenticationService`](EntityStorageAuthenticationService.md)

Create a new instance of EntityStorageAuthentication.

#### Parameters

##### options?

[`IEntityStorageAuthenticationServiceConstructorOptions`](../interfaces/IEntityStorageAuthenticationServiceConstructorOptions.md)

The dependencies for the identity connector.

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

##### nodeIdentity

`string`

The identity of the node.

##### nodeLoggingConnectorType?

`string`

The node logging connector type, defaults to "node-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IAuthenticationComponent.start`

***

### login()

> **login**(`email`, `password`): `Promise`\<\{ `token`: `string`; `expiry`: `number`; \}\>

Perform a login for the user.

#### Parameters

##### email

`string`

The email address for the user.

##### password

`string`

The password for the user.

#### Returns

`Promise`\<\{ `token`: `string`; `expiry`: `number`; \}\>

The authentication token for the user, if it uses a mechanism with public access.

#### Implementation of

`IAuthenticationComponent.login`

***

### logout()

> **logout**(`token`?): `Promise`\<`void`\>

Logout the current user.

#### Parameters

##### token?

`string`

The token to logout, if it uses a mechanism with public access.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IAuthenticationComponent.logout`

***

### refresh()

> **refresh**(`token`?): `Promise`\<\{ `token`: `string`; `expiry`: `number`; \}\>

Refresh the token.

#### Parameters

##### token?

`string`

The token to refresh, if it uses a mechanism with public access.

#### Returns

`Promise`\<\{ `token`: `string`; `expiry`: `number`; \}\>

The refreshed token, if it uses a mechanism with public access.

#### Implementation of

`IAuthenticationComponent.refresh`
