# Class: AuthHeaderProcessor

Handle a JWT token in the authorization header or cookies and validate it to populate request context identity.

## Implements

- `IBaseRouteProcessor`

## Constructors

### new AuthHeaderProcessor()

> **new AuthHeaderProcessor**(`options`?): [`AuthHeaderProcessor`](AuthHeaderProcessor.md)

Create a new instance of AuthCookiePreProcessor.

#### Parameters

##### options?

[`IAuthHeaderProcessorConstructorOptions`](../interfaces/IAuthHeaderProcessorConstructorOptions.md)

Options for the processor.

#### Returns

[`AuthHeaderProcessor`](AuthHeaderProcessor.md)

## Properties

### NAMESPACE

> `readonly` `static` **NAMESPACE**: `string` = `"auth-header"`

The namespace supported by the processor.

***

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IBaseRouteProcessor.CLASS_NAME`

## Methods

### start()

> **start**(`nodeIdentity`, `nodeLoggingConnectorType`?): `Promise`\<`void`\>

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
