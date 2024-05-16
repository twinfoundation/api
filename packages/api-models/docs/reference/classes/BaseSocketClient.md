# Class: `abstract` BaseSocketClient

Event bus which publishes using web-sockets.

## Constructors

### new BaseSocketClient()

> **new BaseSocketClient**(`implementationName`, `config`, `pathPrefix`): [`BaseSocketClient`](BaseSocketClient.md)

Create a new instance of BaseSocketClient.

#### Parameters

• **implementationName**: `string`

The name of the class implementation socket calls.

• **config**: [`IBaseSocketClientConfig`](../interfaces/IBaseSocketClientConfig.md)

The configuration for the client.

• **pathPrefix**: `string`

The default prefix to use if none in configuration.

#### Returns

[`BaseSocketClient`](BaseSocketClient.md)

## Methods

### handleConnected()

> `protected` `abstract` **handleConnected**(): `Promise`\<`void`\>

Handle the socket connection.

#### Returns

`Promise`\<`void`\>

***

### handleError()

> `protected` `abstract` **handleError**(`requestContext`, `err`): `Promise`\<`void`\>

Handle an error.

#### Parameters

• **requestContext**: `IRequestContext`

The context for the request.

• **err**: `IError`

The error to handle.

#### Returns

`Promise`\<`void`\>

***

### isConnected()

> `protected` **isConnected**(): `boolean`

Is the socket connected.

#### Returns

`boolean`

True if the socket is connected.

***

### onMessage()

> `protected` **onMessage**\<`T`\>(`message`, `callback`): `void`

Setup a handler for a message from the socket.

#### Type parameters

• **T**

#### Parameters

• **message**: `string`

The message to look for.

• **callback**

The method to call when the message arrives.

#### Returns

`void`

***

### sendMessage()

> `protected` **sendMessage**\<`T`\>(`message`, `data`): `void`

Send a message on the socket.

#### Type parameters

• **T**

#### Parameters

• **message**: `string`

The message to send.

• **data**: `T`

The data to send with the message.

#### Returns

`void`

***

### socketConnect()

> `protected` **socketConnect**(`requestContext`): `boolean`

Connect the socket if its not already connected.

#### Parameters

• **requestContext**: `IRequestContext`

The context for the request.

#### Returns

`boolean`

True if the socket is already connected.

***

### socketDisconnect()

> `protected` **socketDisconnect**(): `void`

Disconnect the socket if its connected.

#### Returns

`void`
