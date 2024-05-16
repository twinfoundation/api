# Interface: IBaseRestClientConfig

Definition for the configuration of a rest client.

## Properties

### endpoint

> **endpoint**: `string`

The endpoint where the api is hosted.

***

### headers?

> `optional` **headers**: `IHttpRequestHeaders`

The headers to include in requests.

***

### includeCredentials?

> `optional` **includeCredentials**: `boolean`

Include credentials in the request, defaults to true.

***

### pathPrefix?

> `optional` **pathPrefix**: `string`

The prefix to the routes.

***

### timeout?

> `optional` **timeout**: `number`

Timeout for requests in ms.
