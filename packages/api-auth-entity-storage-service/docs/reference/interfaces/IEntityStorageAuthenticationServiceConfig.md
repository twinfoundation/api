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

### defaultTtlMinutes?

> `optional` **defaultTtlMinutes**: `number`

The default time to live for the JWT.

#### Default

```ts
1440
```
