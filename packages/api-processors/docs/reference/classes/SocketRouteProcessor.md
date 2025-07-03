# Class: SocketRouteProcessor

Process the socket request and hands it on to the route handler.

## Implements

- `ISocketRouteProcessor`

## Constructors

### Constructor

> **new SocketRouteProcessor**(`options?`): `SocketRouteProcessor`

Create a new instance of SocketRouteProcessor.

#### Parameters

##### options?

[`ISocketRouteProcessorConstructorOptions`](../interfaces/ISocketRouteProcessorConstructorOptions.md)

Options for the processor.

#### Returns

`SocketRouteProcessor`

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

##### request

`IHttpServerRequest`

The incoming request.

##### response

`IHttpResponse`

The outgoing response.

##### route

The route to process.

`undefined` | `ISocketRoute`\<`any`, `any`\>

##### requestIdentity

`IHttpRequestIdentity`

The identity context for the request.

##### processorState

The state handed through the processors.

##### responseEmitter

(`topic`, `response`) => `Promise`\<`void`\>

The function to emit a response.

#### Returns

`Promise`\<`void`\>

#### Implementation of

`ISocketRouteProcessor.process`
