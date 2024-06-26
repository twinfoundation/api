# Class: FastifyWebServer

Implementation of the web server using Fastify.

## Implements

- `IWebServer`

## Constructors

### new FastifyWebServer()

> **new FastifyWebServer**(`options`?): [`FastifyWebServer`](FastifyWebServer.md)

Create a new instance of FastifyWebServer.

#### Parameters

• **options?**

Options for the server.

• **options.loggingConnectorType?**: `string`

The type of logging connector to use, defaults to "logging".

#### Returns

[`FastifyWebServer`](FastifyWebServer.md)

## Methods

### build()

> **build**(`restRouteProcessors`, `restRoutes`, `options`?): `Promise`\<`void`\>

Build the server.

#### Parameters

• **restRouteProcessors**: `HttpRestRouteProcessor`[]

The hooks to process the incoming requests.

• **restRoutes**: `IRestRoute`\<`any`, `any`\>[]

The REST routes.

• **options?**: `IWebServerOptions`

Options for building the server.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IWebServer.build`

***

### start()

> **start**(): `Promise`\<`void`\>

Start the server.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IWebServer.start`

***

### stop()

> **stop**(): `Promise`\<`void`\>

Stop the server.

#### Returns

`Promise`\<`void`\>

Nothing.

#### Implementation of

`IWebServer.stop`
