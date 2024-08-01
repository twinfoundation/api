# Interface: IAuthentication

Contract definition for authentication service.

## Extends

- `IService`

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

The name of the service.

#### Inherited from

`IService.CLASS_NAME`

## Methods

### bootstrap()?

> `optional` **bootstrap**(`systemLoggingConnectorType`?): `Promise`\<`void`\>

Bootstrap the service by creating and initializing any resources it needs.

#### Parameters

• **systemLoggingConnectorType?**: `string`

The system logging connector type, defaults to "system-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.bootstrap`

***

### start()?

> `optional` **start**(`systemRequestContext`, `systemLoggingConnectorType`?): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Parameters

• **systemRequestContext**: `IServiceRequestContext`

The system request context.

• **systemLoggingConnectorType?**: `string`

The system logging connector type, defaults to "system-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.start`

***

### stop()?

> `optional` **stop**(`systemRequestContext`, `systemLoggingConnectorType`?): `Promise`\<`void`\>

The service needs to be stopped when the application is closed.

#### Parameters

• **systemRequestContext**: `IServiceRequestContext`

The system request context.

• **systemLoggingConnectorType?**: `string`

The system logging connector type, defaults to "system-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Inherited from

`IService.stop`

***

### login()

> **login**(`email`, `password`, `requestContext`?): `Promise`\<`undefined` \| `string`\>

Perform a login for the user.

#### Parameters

• **email**: `string`

The email address for the user.

• **password**: `string`

The password for the user.

• **requestContext?**: `IServiceRequestContext`

The context for the request.

#### Returns

`Promise`\<`undefined` \| `string`\>

The authentication token for the user, if it uses a mechanism with public access.

***

### logout()

> **logout**(`token`?, `requestContext`?): `Promise`\<`void`\>

Logout the current user.

#### Parameters

• **token?**: `string`

The token to logout, if it uses a mechanism with public access.

• **requestContext?**: `IServiceRequestContext`

The context for the request.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### refresh()

> **refresh**(`token`?, `requestContext`?): `Promise`\<`undefined` \| `string`\>

Refresh the token.

#### Parameters

• **token?**: `string`

The token to refresh, if it uses a mechanism with public access.

• **requestContext?**: `IServiceRequestContext`

The context for the request.

#### Returns

`Promise`\<`undefined` \| `string`\>

The refreshed token, if it uses a mechanism with public access.
