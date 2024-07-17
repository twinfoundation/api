# Class: ApiKeyPartitionProcessor

Lookup Api Keys in entity storage to try and find the associated partition id.

## Implements

- `IHttpRestRouteProcessor`

## Constructors

### new ApiKeyPartitionProcessor()

> **new ApiKeyPartitionProcessor**(`options`): [`ApiKeyPartitionProcessor`](ApiKeyPartitionProcessor.md)

Create a new instance of ApiKeyPartitionProcessor.

#### Parameters

• **options**

Options for the processor.

• **options.entityStorageConnectorType?**: `string`

The type for the entity storage connector, defaults to "api-key".

• **options.fixedPartitionId**: `string`

The partition id for the api keys.

• **options.headerName?**: `string`

The name of the header to look for the API key, defaults to "x-api-key".

#### Returns

[`ApiKeyPartitionProcessor`](ApiKeyPartitionProcessor.md)

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
