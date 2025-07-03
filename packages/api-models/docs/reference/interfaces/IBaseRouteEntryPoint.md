# Interface: IBaseRouteEntryPoint\<T\>

Route entry points are used for exposing the routes from a package.

## Type Parameters

### T

`T`

## Properties

### name

> **name**: `string`

The name of the routes.

***

### defaultBaseRoute

> **defaultBaseRoute**: `string`

The default base route name for the routes.

***

### tags

> **tags**: [`ITag`](ITag.md)[]

The tags for the routes.

***

### generateRoutes()

> **generateRoutes**: (`baseRouteName`, `componentName`) => `T`[]

The method to generate the routes.

#### Parameters

##### baseRouteName

`string`

##### componentName

`string`

#### Returns

`T`[]
