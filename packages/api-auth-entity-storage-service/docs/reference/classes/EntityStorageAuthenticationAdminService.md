# Class: EntityStorageAuthenticationAdminService

Implementation of the authentication component using entity storage.

## Implements

- `IAuthenticationAdminComponent`

## Constructors

### Constructor

> **new EntityStorageAuthenticationAdminService**(`options?`): `EntityStorageAuthenticationAdminService`

Create a new instance of EntityStorageAuthentication.

#### Parameters

##### options?

[`IEntityStorageAuthenticationAdminServiceConstructorOptions`](../interfaces/IEntityStorageAuthenticationAdminServiceConstructorOptions.md)

The dependencies for the identity connector.

#### Returns

`EntityStorageAuthenticationAdminService`

## Properties

### NAMESPACE

> `readonly` `static` **NAMESPACE**: `string` = `"authentication-admin-entity-storage"`

The namespace supported by the authentication service.

***

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IAuthenticationAdminComponent.CLASS_NAME`

## Methods

### create()

> **create**(`email`, `password`, `identity`): `Promise`\<`void`\>

Create a login for the user.

#### Parameters

##### email

`string`

The email address for the user.

##### password

`string`

The password for the user.

##### identity

`string`

The DID to associate with the account.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IAuthenticationAdminComponent.create`

***

### remove()

> **remove**(`email`): `Promise`\<`void`\>

Remove the current user.

#### Parameters

##### email

`string`

The email address of the user to remove.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IAuthenticationAdminComponent.remove`

***

### updatePassword()

> **updatePassword**(`email`, `newPassword`, `currentPassword?`): `Promise`\<`void`\>

Update the user's password.

#### Parameters

##### email

`string`

The email address of the user to update.

##### newPassword

`string`

The new password for the user.

##### currentPassword?

`string`

The current password, optional, if supplied will check against existing.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IAuthenticationAdminComponent.updatePassword`
