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

### systemIdentity

> **systemIdentity**: `string`

The identity of the system which owns the signing key.
