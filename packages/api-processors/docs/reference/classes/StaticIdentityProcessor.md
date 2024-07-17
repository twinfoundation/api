# Class: StaticIdentityProcessor

Adds a static identity to the request context.

## Implements

- `IHttpRestRouteProcessor`

## Constructors

### new StaticIdentityProcessor()

> **new StaticIdentityProcessor**(`options`?): [`StaticIdentityProcessor`](StaticIdentityProcessor.md)

Create a new instance of StaticIdentityProcessor.

#### Parameters

• **options?**

Options for the processor.

• **options.identity?**: `Uint8Array`

The fixed identity for request context.

#### Returns

[`StaticIdentityProcessor`](StaticIdentityProcessor.md)

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
