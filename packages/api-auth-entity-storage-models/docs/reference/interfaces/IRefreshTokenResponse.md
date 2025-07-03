# Interface: IRefreshTokenResponse

Response from a refresh on the auth token.

## Properties

### body

> **body**: `object`

The refresh token details.

#### token?

> `optional` **token**: `string`

The refreshed token, if it uses a mechanism with public access.

#### expiry

> **expiry**: `number`

The expiry time of the token.
