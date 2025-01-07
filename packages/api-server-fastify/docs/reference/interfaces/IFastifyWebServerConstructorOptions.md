# Interface: IFastifyWebServerConstructorOptions

The options for the Fastify web server constructor.

## Properties

### loggingConnectorType?

> `optional` **loggingConnectorType**: `string`

The type of the logging connector to use, if undefined, no logging will happen.

***

### config?

> `optional` **config**: [`IFastifyWebServerConfig`](IFastifyWebServerConfig.md)

Additional configuration for the server.

***

### mimeTypeProcessors?

> `optional` **mimeTypeProcessors**: `IMimeTypeProcessor`[]

Additional MIME type processors.
