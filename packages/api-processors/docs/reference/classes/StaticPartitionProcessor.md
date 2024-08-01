# Class: StaticPartitionProcessor

Adds a static partition to the request context.

## Implements

- `IHttpRestRouteProcessor`

## Constructors

### new StaticPartitionProcessor()

> **new StaticPartitionProcessor**(`options`): [`StaticPartitionProcessor`](StaticPartitionProcessor.md)

Create a new instance of StaticPartitionProcessor.

#### Parameters

• **options**

Options for the processor.

• **options.config**: [`IStaticPartitionProcessorConfig`](../interfaces/IStaticPartitionProcessorConfig.md)

The configuration for the processor.

#### Returns

[`StaticPartitionProcessor`](StaticPartitionProcessor.md)

Promise that resolves when the processor is initialized.

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IHttpRestRouteProcessor.CLASS_NAME`

## Methods

### pre()

> **pre**(`request`, `response`, `route`, `requestContext`, `processorState`): `Promise`\<`void`\>

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

• **processorState**

The state handed through the processors.

#### Returns

`Promise`\<`void`\>

#### Implementation of

`IHttpRestRouteProcessor.pre`
