# Class: EntityStorageAuthenticationClient

The client to connect to the authentication service.

## Extends

- `BaseRestClient`

## Implements

- `IAuthentication`

## Constructors

### new EntityStorageAuthenticationClient()

> **new EntityStorageAuthenticationClient**(`config`): [`EntityStorageAuthenticationClient`](EntityStorageAuthenticationClient.md)

Create a new instance of EntityStorageAuthenticationClient.

#### Parameters

• **config**: `IBaseRestClientConfig`

The configuration for the client.

#### Returns

[`EntityStorageAuthenticationClient`](EntityStorageAuthenticationClient.md)

#### Overrides

`BaseRestClient.constructor`

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IAuthentication.CLASS_NAME`

## Methods

### login()

> **login**(`email`, `password`): `Promise`\<`object`\>

Perform a login for the user.

#### Parameters

• **email**: `string`

The email address for the user.

• **password**: `string`

The password for the user.

#### Returns

`Promise`\<`object`\>

The authentication token for the user, if it uses a mechanism with public access.

##### token?

> `optional` **token**: `string`

##### expiry

> **expiry**: `number`

#### Implementation of

`IAuthentication.login`

***

### logout()

> **logout**(`token`?): `Promise`\<`void`\>

Logout the current user.

#### Parameters

• **token?**: `string`

The token to logout, if it uses a mechanism with public access.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IAuthentication.logout`

***

### refresh()

> **refresh**(`token`?): `Promise`\<`object`\>

Refresh the token.

#### Parameters

• **token?**: `string`

The token to refresh, if it uses a mechanism with public access.

#### Returns

`Promise`\<`object`\>

The refreshed token, if it uses a mechanism with public access.

##### token?

> `optional` **token**: `string`

##### expiry

> **expiry**: `number`

#### Implementation of

`IAuthentication.refresh`

***

### getEndpointWithPrefix()

> **getEndpointWithPrefix**(): `string`

Get the endpoint with the prefix for the namespace.

#### Returns

`string`

The endpoint with namespace prefix attached.

#### Inherited from

`BaseRestClient.getEndpointWithPrefix`

***

### fetch()

> **fetch**\<`T`, `U`\>(`route`, `method`, `request`?): `Promise`\<`U`\>

Perform a request in json format.

#### Type parameters

• **T** *extends* `IHttpRequest`\<`any`\>

• **U** *extends* `IHttpResponse`\<`any`\>

#### Parameters

• **route**: `string`

The route of the request.

• **method**: `HttpMethod`

The http method.

• **request?**: `T`

Request to send to the endpoint.

#### Returns

`Promise`\<`U`\>

The response.

#### Inherited from

`BaseRestClient.fetch`
