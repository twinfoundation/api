# Class: JwtIdentityProcessor

Handle a JWT token in the headers or cookie and validate it to populate request context identity.

## Implements

- `IHttpRestRouteProcessor`

## Constructors

### new JwtIdentityProcessor()

> **new JwtIdentityProcessor**(`options`): [`JwtIdentityProcessor`](JwtIdentityProcessor.md)

Create a new instance of JwtIdentityProcessor.

#### Parameters

• **options**

Options for the processor.

• **options.key**: `Uint8Array`

The key for verifying the JWT token.

#### Returns

[`JwtIdentityProcessor`](JwtIdentityProcessor.md)

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
