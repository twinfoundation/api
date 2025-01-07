# Interface: IEntityStorageAuthenticationServiceConstructorOptions

Options for the EntityStorageAuthenticationService constructor.

## Properties

### userEntityStorageType?

> `optional` **userEntityStorageType**: `string`

The entity storage for the users.

#### Default

```ts
authentication-user
```

***

### vaultConnectorType?

> `optional` **vaultConnectorType**: `string`

The vault for the private keys.

#### Default

```ts
vault
```

***

### config?

> `optional` **config**: [`IEntityStorageAuthenticationServiceConfig`](IEntityStorageAuthenticationServiceConfig.md)

The configuration for the authentication.
