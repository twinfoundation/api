# Interface: IAuthenticationComponent

Contract definition for authentication component.

## Extends

- `IComponent`

## Methods

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
