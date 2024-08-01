# Class: AuthCookiePostProcessor

Store a JWT token in cookies when a new token is created.

## Implements

- `IHttpRestRouteProcessor`

## Constructors

### new AuthCookiePostProcessor()

> **new AuthCookiePostProcessor**(`options`?): [`AuthCookiePostProcessor`](AuthCookiePostProcessor.md)

Create a new instance of AuthCookiePostProcessor.

#### Parameters

• **options?**

Options for the processor.

• **options.config?**: [`AuthCookiePreProcessorConfig`](../interfaces/AuthCookiePreProcessorConfig.md)

The configuration for the processor.

#### Returns

[`AuthCookiePostProcessor`](AuthCookiePostProcessor.md)

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
