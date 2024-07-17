# Interface: IRestRouteEntryPoint

Route entry points are used for exposing the REST routes from a package.

## Properties

### name

> **name**: `string`

The name of the REST routes.

***

### defaultBaseRouteName?

> `optional` **defaultBaseRouteName**: `string`

The default base route name for the REST routes.

***

### tags

> **tags**: [`ITag`](ITag.md)[]

The tags for the REST routes.

***

### generateRoutes()

> **generateRoutes**: (`baseRouteName`, `factoryServiceName`) => [`IRestRoute`](IRestRoute.md)\<`any`, `any`\>[]

The method to generate the REST routes.

#### Parameters

• **baseRouteName**: `string`

• **factoryServiceName**: `string`

#### Returns

[`IRestRoute`](IRestRoute.md)\<`any`, `any`\>[]
