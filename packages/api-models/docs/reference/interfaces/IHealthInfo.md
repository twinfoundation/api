# Interface: IHealthInfo

The status of the server.

## Properties

### status

> **status**: [`HealthStatus`](../type-aliases/HealthStatus.md)

The status.

***

### components?

> `optional` **components**: `object`[]

The status of the components.

#### name

> **name**: `string`

The name of the component.

#### status

> **status**: [`HealthStatus`](../type-aliases/HealthStatus.md)

The status of the component.

#### details?

> `optional` **details**: `string`

The details for the status.
