# Interface: IAuthHeaderProcessorConfig

Configuration for the authentication header processor

## Properties

### signingKeyName?

> `optional` **signingKeyName**: `string`

The name of the key to retrieve from the vault for signing JWT.

#### Default

```ts
auth-signing
```

***

### cookieName?

> `optional` **cookieName**: `string`

The name of the cookie to use for the token.

#### Default

```ts
access_token
```
