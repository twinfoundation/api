# Interface: IBaseRestClientConfig

Definition for the configuration of a rest client.

## Properties

### endpoint

• **endpoint**: `string`

The endpoint where the api is hosted.

___

### headers

• `Optional` **headers**: `IHttpRequestHeaders`

The headers to include in requests.

___

### includeCredentials

• `Optional` **includeCredentials**: `boolean`

Include credentials in the request, defaults to true.

___

### pathPrefix

• `Optional` **pathPrefix**: `string`

The prefix to the routes.

___

### timeout

• `Optional` **timeout**: `number`

Timeout for requests in ms.
