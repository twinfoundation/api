# Class: `abstract` BaseSocketClient

Event bus which publishes using web-sockets.

## Constructors

### new BaseSocketClient()

> **new BaseSocketClient**(`implementationName`, `config`, `pathPrefix`): [`BaseSocketClient`](BaseSocketClient.md)

Create a new instance of BaseSocketClient.

#### Parameters

##### implementationName

`string`

The name of the class implementation socket calls.

##### config

`IBaseSocketClientConfig`

The configuration for the client.

##### pathPrefix

`string`

The default prefix to use if none in configuration.

#### Returns

[`BaseSocketClient`](BaseSocketClient.md)

## Methods

### onEvent()

> `protected` **onEvent**\<`T`\>(`event`, `callback`): `void`

Setup a handler for an event from the socket.

#### Type Parameters

• **T** *extends* `IHttpResponse`\<`any`\>

#### Parameters

##### event

`string`

The event to look for.

##### callback

(`response`) => `Promise`\<`void`\>

The method to call when the event arrives.

#### Returns

`void`

***

### offEvent()

> `protected` **offEvent**(`event`): `void`

Remove a handler for a event from the socket.

#### Parameters

##### event

`string`

The event to look for.

#### Returns

`void`

***

### sendEvent()

> `protected` **sendEvent**\<`T`\>(`event`, `data`): `void`

Send a event on the socket.

#### Type Parameters

• **T** *extends* `IHttpRequest`\<`any`\>

#### Parameters

##### event

`string`

The event to send.

##### data

`T`

The data to send with the event.

#### Returns

`void`

***

### socketConnect()

> `protected` **socketConnect**(): `boolean`

Connect the socket if its not already connected.

#### Returns

`boolean`

True if the socket is already connected.

***

### socketDisconnect()

> `protected` **socketDisconnect**(): `void`

Disconnect the socket if its connected.

#### Returns

`void`

***

### isConnected()

> `protected` **isConnected**(): `boolean`

Is the socket connected.

#### Returns

`boolean`

True if the socket is connected.

***

### handleConnected()

> `abstract` `protected` **handleConnected**(): `Promise`\<`void`\>

Handle the socket connection.

#### Returns

`Promise`\<`void`\>

***

### handleError()

> `abstract` `protected` **handleError**(`err`): `Promise`\<`void`\>

Handle an error.

#### Parameters

##### err

`IError`

The error to handle.

#### Returns

`Promise`\<`void`\>
