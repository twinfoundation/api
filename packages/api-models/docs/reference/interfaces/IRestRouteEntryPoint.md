# Interface: IRestRouteEntryPoint

Route entry points are used for exposing the REST routes from a package.

## Properties

### name

> **name**: `string`

The name of the REST routes.

***

### defaultBaseRoute

> **defaultBaseRoute**: `string`

The default base route name for the REST routes.

***

### tags

> **tags**: [`ITag`](ITag.md)[]

The tags for the REST routes.

***

### generateRoutes()

> **generateRoutes**: (`baseRouteName`, `componentName`) => [`IRestRoute`](IRestRoute.md)\<`any`, `any`\>[]

The method to generate the REST routes.

#### Parameters

• **baseRouteName**: `string`

• **componentName**: `string`

#### Returns

[`IRestRoute`](IRestRoute.md)\<`any`, `any`\>[]
