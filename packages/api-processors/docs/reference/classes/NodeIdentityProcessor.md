# Class: NodeIdentityProcessor

Adds a node identity to the request identity.

## Implements

- `IBaseRouteProcessor`

## Constructors

### Constructor

> **new NodeIdentityProcessor**(): `NodeIdentityProcessor`

#### Returns

`NodeIdentityProcessor`

## Properties

### NAMESPACE

> `readonly` `static` **NAMESPACE**: `string` = `"node-identity"`

The namespace supported by the processor.

***

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IBaseRouteProcessor.CLASS_NAME`

## Methods

### start()

> **start**(`nodeIdentity`, `nodeLoggingConnectorType?`): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Parameters

##### nodeIdentity

`string`

The identity of the node.

##### nodeLoggingConnectorType?

`string`

The node logging connector type, defaults to "node-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IBaseRouteProcessor.start`

***

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
