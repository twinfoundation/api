# Class: TokenHelper

Helper class for token operations.

## Constructors

### new TokenHelper()

> **new TokenHelper**(): [`TokenHelper`](TokenHelper.md)

#### Returns

[`TokenHelper`](TokenHelper.md)

## Methods

### createToken()

> `static` **createToken**(`vaultConnector`, `signingKeyName`, `subject`, `ttlMinutes`): `Promise`\<\{ `token`: `string`; `expiry`: `number`; \}\>

Create a new token.

#### Parameters

##### vaultConnector

`IVaultConnector`

The vault connector.

##### signingKeyName

`string`

The signing key name.

##### subject

`string`

The subject for the token.

##### ttlMinutes

`number`

The time to live for the token in minutes.

#### Returns

`Promise`\<\{ `token`: `string`; `expiry`: `number`; \}\>

The new token and its expiry date.

***

### verify()

> `static` **verify**(`vaultConnector`, `signingKeyName`, `token`): `Promise`\<\{ `header`: `IJwtHeader`; `payload`: `IJwtPayload`; \}\>

Verify the token.

#### Parameters

##### vaultConnector

`IVaultConnector`

The vault connector.

##### signingKeyName

`string`

The signing key name.

##### token

The token to verify.

`undefined` | `string`

#### Returns

`Promise`\<\{ `header`: `IJwtHeader`; `payload`: `IJwtPayload`; \}\>

The verified details.

#### Throws

UnauthorizedError if the token is missing, invalid or expired.

***

### extractTokenFromHeaders()

> `static` **extractTokenFromHeaders**(`headers`?, `cookieName`?): `undefined` \| \{ `token`: `string`; `location`: `"authorization"` \| `"cookie"`; \}

Extract the auth token from the headers, either from the authorization header or the cookie header.

#### Parameters

##### headers?

`IHttpHeaders`

The headers to extract the token from.

##### cookieName?

`string`

The name of the cookie to extract the token from.

#### Returns

`undefined` \| \{ `token`: `string`; `location`: `"authorization"` \| `"cookie"`; \}

The token if found.
