# Class: EntityStorageAuthenticationProcessor

Handle a JWT token in the headers and validate it to populate request context identity.

## Implements

- `IHttpRestRouteProcessor`

## Constructors

### new EntityStorageAuthenticationProcessor()

> **new EntityStorageAuthenticationProcessor**(`options`?): [`EntityStorageAuthenticationProcessor`](EntityStorageAuthenticationProcessor.md)

Create a new instance of EntityStorageAuthenticationProcessor.

#### Parameters

• **options?**

Options for the processor.

• **options.vaultConnectorType?**: `string`

The vault for the private keys, defaults to "vault".

• **options.config?**: [`IEntityStorageAuthenticationProcessorConfig`](../interfaces/IEntityStorageAuthenticationProcessorConfig.md)

The configuration for the processor.

#### Returns

[`EntityStorageAuthenticationProcessor`](EntityStorageAuthenticationProcessor.md)

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IHttpRestRouteProcessor.CLASS_NAME`

## Methods

### start()

> **start**(`systemRequestContext`, `systemLoggingConnectorType`?): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Parameters

• **systemRequestContext**: `IServiceRequestContext`

The system request context.

• **systemLoggingConnectorType?**: `string`

The system logging connector type, defaults to "system-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IHttpRestRouteProcessor.start`

***

### process()

> **process**(`request`, `response`, `route`, `requestContext`, `state`): `Promise`\<`void`\>

Process the REST request for the specified route.

#### Parameters

• **request**: `IHttpServerRequest`\<`any`\>

The incoming request.

• **response**: `IHttpResponse`\<`any`\>

The outgoing response.

• **route**: `undefined` \| `IRestRoute`\<`any`, `any`\>

The route to process.

• **requestContext**: `IServiceRequestContext`

The context for the request.

• **state**

The state for the request.

#### Returns

`Promise`\<`void`\>

#### Implementation of

`IHttpRestRouteProcessor.process`
