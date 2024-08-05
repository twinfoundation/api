# Class: LoggingProcessor

Process the REST request and log its information.

## Implements

- `IHttpRestRouteProcessor`

## Constructors

### new LoggingProcessor()

> **new LoggingProcessor**(`options`?): [`LoggingProcessor`](LoggingProcessor.md)

Create a new instance of RequestLoggingProcessor.

#### Parameters

• **options?**

Options for the processor.

• **options.loggingConnectorType?**: `string`

The type for the logging connector, defaults to "logging".

• **options.config?**: [`IRequestLoggingProcessorConfig`](../interfaces/IRequestLoggingProcessorConfig.md)

The configuration for the processor.

#### Returns

[`LoggingProcessor`](LoggingProcessor.md)

Promise that resolves when the processor is initialized.

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IHttpRestRouteProcessor.CLASS_NAME`

## Methods

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
