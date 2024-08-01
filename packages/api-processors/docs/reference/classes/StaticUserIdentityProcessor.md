# Class: StaticUserIdentityProcessor

Adds a static user identity to the request context.

## Implements

- `IHttpRestRouteProcessor`

## Constructors

### new StaticUserIdentityProcessor()

> **new StaticUserIdentityProcessor**(`options`): [`StaticUserIdentityProcessor`](StaticUserIdentityProcessor.md)

Create a new instance of StaticIdentityProcessor.

#### Parameters

• **options**

Options for the processor.

• **options.config**: [`IStaticUserIdentityProcessorConfig`](../interfaces/IStaticUserIdentityProcessorConfig.md)

The configuration for the processor.

#### Returns

[`StaticUserIdentityProcessor`](StaticUserIdentityProcessor.md)

Promise that resolves when the processor is initialized.

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IHttpRestRouteProcessor.CLASS_NAME`

## Methods

### pre()

> **pre**(`request`, `response`, `route`, `requestContext`, `state`): `Promise`\<`void`\>

Pre process the REST request for the specified route.

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

`IHttpRestRouteProcessor.pre`
