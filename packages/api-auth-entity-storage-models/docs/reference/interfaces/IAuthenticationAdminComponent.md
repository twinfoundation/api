# Interface: IAuthenticationAdminComponent

Contract definition for authentication admin component.

## Extends

- `IComponent`

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
