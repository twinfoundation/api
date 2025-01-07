# Class: HttpParameterHelper

Class to help with handling http parameters.

## Constructors

### new HttpParameterHelper()

> **new HttpParameterHelper**(): [`HttpParameterHelper`](HttpParameterHelper.md)

#### Returns

[`HttpParameterHelper`](HttpParameterHelper.md)

## Methods

### arrayFromString()

> `static` **arrayFromString**\<`T`\>(`values`?): `undefined` \| `T`[]

Convert list query to array.

#### Type Parameters

• **T** = `string`

#### Parameters

##### values?

`string`

The values query string.

#### Returns

`undefined` \| `T`[]

The array of values.

***

### arrayToString()

> `static` **arrayToString**\<`T`\>(`values`?): `undefined` \| `string`

Convert array of values to query string.

#### Type Parameters

• **T** = `string`

#### Parameters

##### values?

`T`[]

The values to combine string.

#### Returns

`undefined` \| `string`

The combined.

***

### objectFromString()

> `static` **objectFromString**\<`T`\>(`value`?): `undefined` \| `T`

Convert object string to object.

#### Type Parameters

• **T** = `unknown`

#### Parameters

##### value?

`string`

The value query string.

#### Returns

`undefined` \| `T`

The object.

***

### objectToString()

> `static` **objectToString**\<`T`\>(`value`?): `undefined` \| `string`

Convert object to query string.

#### Type Parameters

• **T** = `unknown`

#### Parameters

##### value?

`T`

The value to convert to a string.

#### Returns

`undefined` \| `string`

The converted object.
