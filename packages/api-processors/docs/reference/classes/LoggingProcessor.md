# Class: LoggingProcessor

Process the REST request and log its information.

## Implements

- `IBaseRouteProcessor`

## Constructors

### new LoggingProcessor()

> **new LoggingProcessor**(`options`?): [`LoggingProcessor`](LoggingProcessor.md)

Create a new instance of RequestLoggingProcessor.

#### Parameters

• **options?**

Options for the processor.

• **options.loggingConnectorType?**: `string`

The type for the logging connector, defaults to "logging".

• **options.config?**: [`ILoggingProcessorConfig`](../interfaces/ILoggingProcessorConfig.md)

The configuration for the processor.

#### Returns

[`LoggingProcessor`](LoggingProcessor.md)

Promise that resolves when the processor is initialized.

## Properties

### NAMESPACE

> `readonly` `static` **NAMESPACE**: `string` = `"logging"`

The namespace supported by the processor.

***

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IBaseRouteProcessor.CLASS_NAME`

## Methods

### pre()

> **pre**(`request`, `response`, `route`, `requestIdentity`, `processorState`): `Promise`\<`void`\>

Pre process the REST request for the specified route.

#### Parameters

• **request**: `IHttpServerRequest`\<`any`\>

The incoming request.

• **response**: `IHttpResponse`\<`any`\>

The outgoing response.

• **route**: `undefined` \| `IBaseRoute`

The route to process.

• **requestIdentity**: `IHttpRequestIdentity`

The identity context for the request.

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

#### Implementation of

`IBaseRouteProcessor.pre`

***

### post()

> **post**(`request`, `response`, `route`, `requestIdentity`, `processorState`): `Promise`\<`void`\>

Post process the REST request for the specified route.

#### Parameters

• **request**: `IHttpServerRequest`\<`any`\>

The incoming request.

• **response**: `IHttpResponse`\<`any`\>

The outgoing response.

• **route**: `undefined` \| `IBaseRoute`

The route to process.

• **requestIdentity**: `IHttpRequestIdentity`

The identity context for the request.

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

#### Implementation of

`IBaseRouteProcessor.post`
