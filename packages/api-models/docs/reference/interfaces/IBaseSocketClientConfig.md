# Interface: IBaseSocketClientConfig

Definition for the configuration of a socket service.

## Properties

### basePath?

> `optional` **basePath**: `string`

Base path for the socket service, defaults to /socket.

***

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
