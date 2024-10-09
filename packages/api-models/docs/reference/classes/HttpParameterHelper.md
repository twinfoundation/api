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

***

### sortPropertiesFromString()

> `static` **sortPropertiesFromString**\<`T`\>(`sortProperties`?): `undefined` \| `object`[]

Convert the sort string to a list of sort properties.

#### Type Parameters

• **T** = `unknown`

#### Parameters

• **sortProperties?**: `string`

The sort properties query string.

#### Returns

`undefined` \| `object`[]

The list of sort properties.

***

### sortPropertiesToString()

> `static` **sortPropertiesToString**\<`T`\>(`sortProperties`?): `undefined` \| `string`

Convert the sort properties to a string parameter.

#### Type Parameters

• **T** = `unknown`

#### Parameters

• **sortProperties?**: `object`[]

The sort properties to convert.

#### Returns

`undefined` \| `string`

The string version of the sort properties.
