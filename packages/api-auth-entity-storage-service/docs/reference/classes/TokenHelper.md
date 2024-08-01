# Class: TokenHelper

Helper class for token operations.

## Constructors

### new TokenHelper()

> **new TokenHelper**(): [`TokenHelper`](TokenHelper.md)

#### Returns

[`TokenHelper`](TokenHelper.md)

## Methods

### createToken()

> `static` **createToken**(`systemIdentity`, `systemPartitionId`, `vaultConnector`, `signingKeyName`, `subject`, `ttlMinutes`): `Promise`\<`string`\>

Create a new token.

#### Parameters

• **systemIdentity**: `undefined` \| `string`

The system identity.

• **systemPartitionId**: `undefined` \| `string`

The system partition id.

• **vaultConnector**: `IVaultConnector`

The vault connector.

• **signingKeyName**: `string`

The signing key name.

• **subject**: `string`

The subject for the token.

• **ttlMinutes**: `number`

The time to live for the token in minutes.

#### Returns

`Promise`\<`string`\>

The new token.

***

### verify()

> `static` **verify**(`systemIdentity`, `systemPartitionId`, `vaultConnector`, `signingKeyName`, `token`): `Promise`\<`object`\>

Verify the token.

#### Parameters

• **systemIdentity**: `undefined` \| `string`

The system identity.

• **systemPartitionId**: `undefined` \| `string`

The system partition id.

• **vaultConnector**: `IVaultConnector`

The vault connector.

• **signingKeyName**: `string`

The signing key name.

• **token**: `undefined` \| `string`

The token to verify.

#### Returns

`Promise`\<`object`\>

The verified details.

##### header

> **header**: `IJwtHeader`

##### payload

> **payload**: `IJwtPayload`

#### Throws

UnauthorizedError if the token is missing, invalid or expired.
