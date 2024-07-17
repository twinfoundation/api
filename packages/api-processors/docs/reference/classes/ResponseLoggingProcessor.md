# Class: ResponseLoggingProcessor

Process the REST response and log its information.

## Implements

- `IHttpRestRouteProcessor`

## Constructors

### new ResponseLoggingProcessor()

> **new ResponseLoggingProcessor**(`options`?): [`ResponseLoggingProcessor`](ResponseLoggingProcessor.md)

Create a new instance of ResponseLoggingProcessor.

#### Parameters

• **options?**

Options for the processor.

• **options.loggingConnectorType?**: `string`

The type for the logging connector, defaults to "logging".

• **options.includeBody?**: `boolean`

Include the body objects when logging the information.

#### Returns

[`ResponseLoggingProcessor`](ResponseLoggingProcessor.md)

Promise that resolves when the processor is initialized.

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

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
