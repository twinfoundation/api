# Class: StaticUserIdentityProcessor

Adds a static user identity to the request context.

## Implements

- `IBaseRouteProcessor`

## Constructors

### new StaticUserIdentityProcessor()

> **new StaticUserIdentityProcessor**(`options`): [`StaticUserIdentityProcessor`](StaticUserIdentityProcessor.md)

Create a new instance of StaticIdentityProcessor.

#### Parameters

##### options

[`IStaticUserIdentityProcessorConstructorOptions`](../interfaces/IStaticUserIdentityProcessorConstructorOptions.md)

Options for the processor.

#### Returns

[`StaticUserIdentityProcessor`](StaticUserIdentityProcessor.md)

## Properties

### NAMESPACE

> `readonly` `static` **NAMESPACE**: `string` = `"static-user-identity"`

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
