# Class: PasswordHelper

Helper class for password operations.

## Constructors

### Constructor

> **new PasswordHelper**(): `PasswordHelper`

#### Returns

`PasswordHelper`

## Methods

### hashPassword()

> `static` **hashPassword**(`passwordBytes`, `saltBytes`): `Promise`\<`string`\>

Hash the password for the user.

#### Parameters

##### passwordBytes

`Uint8Array`

The password bytes.

##### saltBytes

`Uint8Array`

The salt bytes.

#### Returns

`Promise`\<`string`\>

The hashed password.
