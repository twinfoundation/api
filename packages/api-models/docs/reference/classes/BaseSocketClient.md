# Class: BaseSocketClient

Event bus which publishes using web-sockets.

## Constructors

### constructor

• **new BaseSocketClient**(`implementationName`, `config`, `pathPrefix`): [`BaseSocketClient`](BaseSocketClient.md)

Create a new instance of BaseSocketClient.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `implementationName` | `string` | The name of the class implementation socket calls. |
| `config` | [`IBaseSocketClientConfig`](../interfaces/IBaseSocketClientConfig.md) | The configuration for the client. |
| `pathPrefix` | `string` | The default prefix to use if none in configuration. |

#### Returns

[`BaseSocketClient`](BaseSocketClient.md)

## Methods

### handleConnected

▸ **handleConnected**(): `Promise`\<`void`\>

Handle the socket connection.

#### Returns

`Promise`\<`void`\>

___

### handleError

▸ **handleError**(`requestContext`, `err`): `Promise`\<`void`\>

Handle an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestContext` | `IRequestContext` | The context for the request. |
| `err` | `IError` | The error to handle. |

#### Returns

`Promise`\<`void`\>

___

### isConnected

▸ **isConnected**(): `boolean`

Is the socket connected.

#### Returns

`boolean`

True if the socket is connected.

___

### onMessage

▸ **onMessage**\<`T`\>(`message`, `callback`): `void`

Setup a handler for a message from the socket.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message to look for. |
| `callback` | (`data`: `T`) => `Promise`\<`void`\> | The method to call when the message arrives. |

#### Returns

`void`

___

### sendMessage

▸ **sendMessage**\<`T`\>(`message`, `data`): `void`

Send a message on the socket.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | The message to send. |
| `data` | `T` | The data to send with the message. |

#### Returns

`void`

___

### socketConnect

▸ **socketConnect**(`requestContext`): `boolean`

Connect the socket if its not already connected.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestContext` | `IRequestContext` | The context for the request. |

#### Returns

`boolean`

True if the socket is already connected.

___

### socketDisconnect

▸ **socketDisconnect**(): `void`

Disconnect the socket if its connected.

#### Returns

`void`
