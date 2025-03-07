# Class: RestRouteProcessor

Process the REST request and hands it on to the route handler.

## Implements

- `IRestRouteProcessor`

## Constructors

### new RestRouteProcessor()

> **new RestRouteProcessor**(`options`?): [`RestRouteProcessor`](RestRouteProcessor.md)

Create a new instance of RouteProcessor.

#### Parameters

##### options?

[`IRestRouteProcessorConstructorOptions`](../interfaces/IRestRouteProcessorConstructorOptions.md)

Options for the processor.

#### Returns

[`RestRouteProcessor`](RestRouteProcessor.md)

## Properties

### NAMESPACE

> `readonly` `static` **NAMESPACE**: `string` = `"rest-route"`

The namespace supported by the processor.

***

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IRestRouteProcessor.CLASS_NAME`

## Methods

### process()

> **process**(`request`, `response`, `route`, `requestIdentity`, `processorState`): `Promise`\<`void`\>

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

`undefined` | `IRestRoute`\<`any`, `any`\>

##### requestIdentity

`IHttpRequestIdentity`

The identity context for the request.

##### processorState

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

#### Implementation of

`IRestRouteProcessor.process`
