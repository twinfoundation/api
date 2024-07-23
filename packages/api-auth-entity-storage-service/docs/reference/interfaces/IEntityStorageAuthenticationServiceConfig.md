# Interface: IEntityStorageAuthenticationServiceConfig

Configuration for the entity storage authentication service.

## Properties

### signingKeyName?

> `optional` **signingKeyName**: `string`

The name of the key to retrieve from the vault for signing JWT.

#### Default

```ts
auth-signing
```

***

### encryptionKeyName?

> `optional` **encryptionKeyName**: `string`

The name of the key to retrieve from the vault for encrypting passwords.

#### Default

```ts
auth-encryption
```

***

### systemIdentity

> **systemIdentity**: `string`

The identity of the system which owns the signing key.
