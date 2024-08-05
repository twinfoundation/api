# Class: AuthHeaderProcessor

Handle a JWT token in the authorization header or cookies and validate it to populate request context identity.

## Implements

- `IHttpRestRouteProcessor`

## Constructors

### new AuthHeaderProcessor()

> **new AuthHeaderProcessor**(`options`?): [`AuthHeaderProcessor`](AuthHeaderProcessor.md)

Create a new instance of AuthCookiePreProcessor.

#### Parameters

• **options?**

Options for the processor.

• **options.vaultConnectorType?**: `string`

The vault for the private keys, defaults to "vault".

• **options.config?**: [`IAuthHeaderProcessorConfig`](../interfaces/IAuthHeaderProcessorConfig.md)

The configuration for the processor.

#### Returns

[`AuthHeaderProcessor`](AuthHeaderProcessor.md)

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IHttpRestRouteProcessor.CLASS_NAME`

## Methods

### start()

> **start**(`systemIdentity`, `systemLoggingConnectorType`?): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Parameters

• **systemIdentity**: `string`

The identity of the system.

• **systemLoggingConnectorType?**: `string`

The system logging connector type, defaults to "system-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IHttpRestRouteProcessor.start`

***

### pre()

> **pre**(`request`, `response`, `route`, `requestIdentity`, `processorState`): `Promise`\<`void`\>

Pre process the REST request for the specified route.

#### Parameters

• **request**: `IHttpServerRequest`\<`any`\>

The incoming request.

• **response**: `IHttpResponse`\<`any`\>

The outgoing response.

• **route**: `undefined` \| `IRestRoute`\<`any`, `any`\>

The route to process.

• **requestIdentity**: `IHttpRequestIdentity`

The identity context for the request.

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

#### Implementation of

`IHttpRestRouteProcessor.pre`

***

### post()

> **post**(`request`, `response`, `route`, `requestIdentity`, `processorState`): `Promise`\<`void`\>

Post process the REST request for the specified route.

#### Parameters

• **request**: `IHttpServerRequest`\<`any`\>

The incoming request.

• **response**: `IHttpResponse`\<`any`\>

The outgoing response.

• **route**: `undefined` \| `IRestRoute`\<`any`, `any`\>

The route to process.

• **requestIdentity**: `IHttpRequestIdentity`

The identity context for the request.

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

#### Implementation of

`IHttpRestRouteProcessor.post`
