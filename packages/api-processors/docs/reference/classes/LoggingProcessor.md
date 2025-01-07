# Class: LoggingProcessor

Process the REST request and log its information.

## Implements

- `IBaseRouteProcessor`

## Constructors

### new LoggingProcessor()

> **new LoggingProcessor**(`options`?): [`LoggingProcessor`](LoggingProcessor.md)

Create a new instance of LoggingProcessor.

#### Parameters

##### options?

[`ILoggingProcessorConstructorOptions`](../interfaces/ILoggingProcessorConstructorOptions.md)

Options for the processor.

#### Returns

[`LoggingProcessor`](LoggingProcessor.md)

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

##### request

`IHttpServerRequest`

The incoming request.

##### response

`IHttpResponse`

The outgoing response.

##### route

The route to process.

`undefined` | `IBaseRoute`

##### requestIdentity

`IHttpRequestIdentity`

The identity context for the request.

##### processorState

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

##### request

`IHttpServerRequest`

The incoming request.

##### response

`IHttpResponse`

The outgoing response.

##### route

The route to process.

`undefined` | `IBaseRoute`

##### requestIdentity

`IHttpRequestIdentity`

The identity context for the request.

##### processorState

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

#### Implementation of

`IBaseRouteProcessor.post`
