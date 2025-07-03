# Interface: IBaseRestClientConfig

Definition for the configuration of a rest client.

## Properties

### endpoint

> **endpoint**: `string`

The endpoint where the api is hosted.

***

### pathPrefix?

> `optional` **pathPrefix**: `string`

The prefix to the routes.

***

### headers?

> `optional` **headers**: `IHttpHeaders`

The headers to include in requests.

***

### timeout?

> `optional` **timeout**: `number`

Timeout for requests in ms.

***

### includeCredentials?

> `optional` **includeCredentials**: `boolean`

Include credentials in the request, defaults to true.
