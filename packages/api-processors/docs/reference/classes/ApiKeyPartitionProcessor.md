# Class: ApiKeyPartitionProcessor

Lookup Api Keys in entity storage to try and find the associated partition id.

## Implements

- `IHttpRestRouteProcessor`

## Constructors

### new ApiKeyPartitionProcessor()

> **new ApiKeyPartitionProcessor**(`options`?): [`ApiKeyPartitionProcessor`](ApiKeyPartitionProcessor.md)

Create a new instance of ApiKeyPartitionProcessor.

#### Parameters

• **options?**

Options for the processor.

• **options.entityStorageConnectorType?**: `string`

The type for the entity storage connector, defaults to "api-key".

• **options.config?**: [`IApiKeyPartitionProcessorConfig`](../interfaces/IApiKeyPartitionProcessorConfig.md)

The configuration for the processor.

#### Returns

[`ApiKeyPartitionProcessor`](ApiKeyPartitionProcessor.md)

Promise that resolves when the processor is initialized.

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IHttpRestRouteProcessor.CLASS_NAME`

## Methods

### start()

> **start**(`systemRequestContext`, `systemLoggingConnectorType`?): `Promise`\<`void`\>

The service needs to be started when the application is initialized.

#### Parameters

• **systemRequestContext**: `IServiceRequestContext`

The system request context.

• **systemLoggingConnectorType?**: `string`

The system logging connector type, defaults to "system-logging".

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IHttpRestRouteProcessor.start`

***

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
