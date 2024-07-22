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

> **login**(`email`, `password`): `Promise`\<`string`\>

Perform a login for the user.

#### Parameters

• **email**: `string`

The email address for the user.

• **password**: `string`

The password for the user.

#### Returns

`Promise`\<`string`\>

The authentication token for the user.

#### Implementation of

`IAuthentication.login`

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
