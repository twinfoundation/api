# Interface: IWebServerOptions

Options for the web server.

## Properties

### port?

> `optional` **port**: `number`

The port to bind the web server to.

#### Default

```ts
3000
```

***

### host?

> `optional` **host**: `string`

The address to bind the web server to.

#### Default

```ts
localhost
```

***

### methods?

> `optional` **methods**: `HttpMethods`[]

The methods that the server accepts.

#### Default

```ts
["GET", "PUT", "POST", "DELETE", "OPTIONS"]
```

***

### allowedHeaders?

> `optional` **allowedHeaders**: `string`[]

Any additional allowed headers.

***

### exposedHeaders?

> `optional` **exposedHeaders**: `string`[]

And additional exposed headers.

***

### corsOrigins?

> `optional` **corsOrigins**: `string` \| `string`[]

The allowed CORS domains.

#### Default

```ts
["*"]
```
