# Class: SocketRouteProcessor

Process the socket request and hands it on to the route handler.

## Implements

- `ISocketRouteProcessor`

## Constructors

### new SocketRouteProcessor()

> **new SocketRouteProcessor**(`options`?): [`SocketRouteProcessor`](SocketRouteProcessor.md)

Create a new instance of SocketRouteProcessor.

#### Parameters

• **options?**

Options for the processor.

• **options.config?**: [`IRouteProcessorConfig`](../interfaces/IRouteProcessorConfig.md)

The configuration for the processor.

#### Returns

[`SocketRouteProcessor`](SocketRouteProcessor.md)

Promise that resolves when the processor is initialized.

## Properties

### NAMESPACE

> `readonly` `static` **NAMESPACE**: `string` = `"socket-route"`

The namespace supported by the processor.

***

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`ISocketRouteProcessor.CLASS_NAME`

## Methods

### process()

> **process**(`request`, `response`, `route`, `requestIdentity`, `processorState`, `responseEmitter`): `Promise`\<`void`\>

Process the REST request for the specified route.

#### Parameters

• **request**: `IHttpServerRequest`\<`any`\>

The incoming request.

• **response**: `IHttpResponse`\<`any`\>

The outgoing response.

• **route**: `undefined` \| `ISocketRoute`\<`any`, `any`\>

The route to process.

• **requestIdentity**: `IHttpRequestIdentity`

The identity context for the request.

• **processorState**

The state handed through the processors.

• **responseEmitter**

The function to emit a response.

#### Returns

`Promise`\<`void`\>

#### Implementation of

`ISocketRouteProcessor.process`
