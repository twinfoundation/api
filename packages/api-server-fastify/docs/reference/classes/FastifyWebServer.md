# Class: FastifyWebServer

Implementation of the web server using Fastify.

## Implements

- `IWebServer`

## Constructors

### new FastifyWebServer()

> **new FastifyWebServer**(`logger`): [`FastifyWebServer`](FastifyWebServer.md)

Create a new instance of FastifyWebServer.

#### Parameters

• **logger**

The logger to use.

#### Returns

[`FastifyWebServer`](FastifyWebServer.md)

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### build()

> **build**(`restRouteProcessors`, `restRoutes`, `options`?): `Promise`\<`void`\>

Build the server.

#### Parameters

• **restRouteProcessors**: `IHttpRestRouteProcessor`[]

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
