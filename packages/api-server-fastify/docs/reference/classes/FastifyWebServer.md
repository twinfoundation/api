# Class: FastifyWebServer

Implementation of the web server using Fastify.

## Implements

- `IWebServer`\<`FastifyInstance`\>

## Constructors

### new FastifyWebServer()

> **new FastifyWebServer**(`options`?): [`FastifyWebServer`](FastifyWebServer.md)

Create a new instance of FastifyWebServer.

#### Parameters

##### options?

[`IFastifyWebServerConstructorOptions`](../interfaces/IFastifyWebServerConstructorOptions.md)

The options for the server.

#### Returns

[`FastifyWebServer`](FastifyWebServer.md)

## Properties

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

## Methods

### getInstance()

> **getInstance**(): `FastifyInstance`\<`IncomingMessage`, `ServerResponse`\>

Get the web server instance.

#### Returns

`FastifyInstance`\<`IncomingMessage`, `ServerResponse`\>

The web server instance.

#### Implementation of

`IWebServer.getInstance`

***

### build()

> **build**(`restRouteProcessors`?, `restRoutes`?, `socketRouteProcessors`?, `socketRoutes`?, `options`?): `Promise`\<`void`\>

Build the server.

#### Parameters

##### restRouteProcessors?

`IRestRouteProcessor`[]

The processors for incoming requests over REST.

##### restRoutes?

`IRestRoute`[]

The REST routes.

##### socketRouteProcessors?

`ISocketRouteProcessor`[]

The processors for incoming requests over Sockets.

##### socketRoutes?

`ISocketRoute`[]

The socket routes.

##### options?

`IWebServerOptions`

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
