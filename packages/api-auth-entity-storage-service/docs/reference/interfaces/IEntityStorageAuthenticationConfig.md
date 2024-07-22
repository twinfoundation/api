# Interface: IEntityStorageAuthenticationConfig

Configuration for the entity storage authentication connector.

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
