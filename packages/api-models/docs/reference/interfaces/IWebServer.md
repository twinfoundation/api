# Interface: IWebServer

Interface describing a web server.

## Methods

### build()

> **build**(`restRouteProcessors`, `restRoutes`, `options`?): `Promise`\<`void`\>

Build the server.

#### Parameters

• **restRouteProcessors**: [`IHttpRestRouteProcessor`](IHttpRestRouteProcessor.md)[]

The hooks to process the incoming requests.

• **restRoutes**: [`IRestRoute`](IRestRoute.md)\<`any`, `any`\>[]

The REST routes.

• **options?**: [`IWebServerOptions`](IWebServerOptions.md)

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
