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

• **values?**: `string`

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

• **values?**: `T`[]

The values to combine string.

#### Returns

`undefined` \| `string`

The combined.

***

### conditionsFromString()

> `static` **conditionsFromString**(`conditions`?): `undefined` \| `IComparator`[]

Convert the conditions string to a list of comparators.

#### Parameters

• **conditions?**: `string`

The conditions query string.

#### Returns

`undefined` \| `IComparator`[]

The list of comparators.

***

### conditionsToString()

> `static` **conditionsToString**(`conditions`?): `undefined` \| `string`

Convert the conditions to a string parameter.

#### Parameters

• **conditions?**: `IComparator`[]

The conditions to convert.

#### Returns

`undefined` \| `string`

The string version of the comparators.
