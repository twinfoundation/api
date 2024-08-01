# Interface: AuthCookiePreProcessorConfig

Configuration for the authentication cookie pre processor.

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
