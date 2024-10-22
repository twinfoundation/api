# Class: JwtMimeTypeProcessor

Process the REST request and log its information.

## Implements

- `IMimeTypeProcessor`

## Constructors

### new JwtMimeTypeProcessor()

> **new JwtMimeTypeProcessor**(): [`JwtMimeTypeProcessor`](JwtMimeTypeProcessor.md)

#### Returns

[`JwtMimeTypeProcessor`](JwtMimeTypeProcessor.md)

## Methods

### getTypes()

> **getTypes**(): `string`[]

Get the MIME types that this handler can handle.

#### Returns

`string`[]

The MIME types that this handler can handle.

#### Implementation of

`IMimeTypeProcessor.getTypes`

***

### handle()

> **handle**(`body`): `Promise`\<`unknown`\>

Handle content.

#### Parameters

• **body**: `Uint8Array`

The body to process.

#### Returns

`Promise`\<`unknown`\>

The processed body.

#### Implementation of

`IMimeTypeProcessor.handle`
