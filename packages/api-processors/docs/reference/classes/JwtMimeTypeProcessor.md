# Class: JwtMimeTypeProcessor

Process the JWT mime type.

## Implements

- `IMimeTypeProcessor`

## Constructors

### new JwtMimeTypeProcessor()

> **new JwtMimeTypeProcessor**(): [`JwtMimeTypeProcessor`](JwtMimeTypeProcessor.md)

#### Returns

[`JwtMimeTypeProcessor`](JwtMimeTypeProcessor.md)

## Properties

### NAMESPACE

> `readonly` `static` **NAMESPACE**: `string` = `"jwt"`

The namespace supported by the processor.

***

### CLASS\_NAME

> `readonly` **CLASS\_NAME**: `string`

Runtime name for the class.

#### Implementation of

`IMimeTypeProcessor.CLASS_NAME`

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
