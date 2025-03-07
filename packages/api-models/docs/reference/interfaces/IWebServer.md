# Interface: IWebServer\<T\>

Interface describing a web server.

## Type Parameters

• **T**

## Methods

### getInstance()

> **getInstance**(): `T`

Get the web server instance.

#### Returns

`T`

The web server instance.

***

### build()

> **build**(`restRouteProcessors`?, `restRoutes`?, `socketRouteProcessors`?, `socketRoutes`?, `options`?): `Promise`\<`void`\>

Build the server.

#### Parameters

##### restRouteProcessors?

[`IRestRouteProcessor`](IRestRouteProcessor.md)[]

The processors for incoming requests over REST.

##### restRoutes?

[`IRestRoute`](IRestRoute.md)\<`any`, `any`\>[]

The REST routes.

##### socketRouteProcessors?

[`ISocketRouteProcessor`](ISocketRouteProcessor.md)[]

The processors for incoming requests over Sockets.

##### socketRoutes?

[`ISocketRoute`](ISocketRoute.md)\<`any`, `any`\>[]

The socket routes.

##### options?

[`IWebServerOptions`](IWebServerOptions.md)

Options for building the server.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### start()

> **start**(): `Promise`\<`void`\>

Start the server.

#### Returns

`Promise`\<`void`\>

Nothing.

***

### stop()

> **stop**(): `Promise`\<`void`\>

Stop the server.

#### Returns

`Promise`\<`void`\>

Nothing.
