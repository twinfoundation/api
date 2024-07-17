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

• **options.partitionId**: `string`

The static partition id.

#### Returns

[`StaticPartitionProcessor`](StaticPartitionProcessor.md)

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
