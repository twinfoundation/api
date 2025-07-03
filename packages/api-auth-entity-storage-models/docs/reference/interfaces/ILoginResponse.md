# Interface: ILoginResponse

Response from a login on the server.

## Properties

### body

> **body**: `object`

The login response details.

#### token?

> `optional` **token**: `string`

The access token, if it uses a mechanism with public access.

#### expiry

> **expiry**: `number`

The expiry time of the token.
