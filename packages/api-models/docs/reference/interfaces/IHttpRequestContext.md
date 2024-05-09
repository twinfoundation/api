# Interface: IHttpRequestContext

Context data from the HTTP request.

## Hierarchy

- `IRequestContext`

  ↳ **`IHttpRequestContext`**

## Properties

### identity

• `Optional` **identity**: `string`

The identity of the requestor if there is an authenticated user.

#### Inherited from

IRequestContext.identity

___

### locale

• `Optional` **locale**: `string`

The locale of the context as a code e.g. es-ES, defaults to en.

#### Inherited from

IRequestContext.locale

___

### tenantId

• `Optional` **tenantId**: `string`

The tenant id for partitioning data, correlated from the api key making the request.

#### Inherited from

IRequestContext.tenantId

___

### url

• **url**: `URL`

The url in the request.
