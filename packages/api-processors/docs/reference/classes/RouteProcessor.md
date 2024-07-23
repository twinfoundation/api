# Class: RouteProcessor

Process the REST request and hands it on to the route handler.

## Implements

- `IHttpRestRouteProcessor`

## Constructors

### new RouteProcessor()

> **new RouteProcessor**(`options`?): [`RouteProcessor`](RouteProcessor.md)

Create a new instance of RouteProcessor.

#### Parameters

• **options?**

Options for the processor.

• **options.config?**: [`IRouteProcessorConfig`](../interfaces/IRouteProcessorConfig.md)

The configuration for the processor.

#### Returns

[`RouteProcessor`](RouteProcessor.md)

Promise that resolves when the processor is initialized.

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IHttpRestRouteProcessor.CLASS_NAME`

## Methods

### process()

> **process**(`request`, `response`, `route`, `requestContext`, `state`): `Promise`\<`void`\>

Process the REST request for the specified route.

#### Parameters

• **request**: `IHttpServerRequest`\<`any`\>

The incoming request.

• **response**: `IHttpResponse`\<`any`\>

The outgoing response.

• **route**: `undefined` \| `IRestRoute`\<`any`, `any`\>

The route to process.

• **requestContext**: `IServiceRequestContext`

The context for the request.

• **state**

The state for the request.

#### Returns

`Promise`\<`void`\>

#### Implementation of

`IHttpRestRouteProcessor.process`

***

### processError()

> `private` **processError**(`err`): `object`

Process the errors from the routes.

#### Parameters

• **err**: `unknown`

The error to process.

#### Returns

`object`

The status code and additional error data.

##### error

> **error**: `IError`

##### httpStatusCode

> **httpStatusCode**: `HttpStatusCode`
