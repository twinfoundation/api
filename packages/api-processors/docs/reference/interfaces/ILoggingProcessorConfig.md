# Interface: ILoggingProcessorConfig

Configuration for the request logging processor.

## Properties

### includeBody?

> `optional` **includeBody**: `boolean`

Include the body objects when logging the information.

***

### fullBase64?

> `optional` **fullBase64**: `boolean`

Show the full base64 content for data, default to abbreviate.

***

### obfuscateProperties?

> `optional` **obfuscateProperties**: `string`[]

List of property names to obfuscate, can be regex, defaults to "password".
