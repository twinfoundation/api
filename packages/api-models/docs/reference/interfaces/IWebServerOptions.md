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

The allowed headers.

#### Default

```ts
[ "X-Requested-With", "Access-Control-Allow-Origin", "X-HTTP-Method-Override", "Content-Type", "Content-Encoding", "Authorization", "Accept", "Accept-Encoding", "X-Api-Key" ]
```

***

### exposedHeaders?

> `optional` **exposedHeaders**: `string`[]

The exposed headers.

#### Default

```ts
["Content-Disposition"]
```

***

### corsOrigins?

> `optional` **corsOrigins**: `string` \| `string`[]

The allowed CORS domains.

#### Default

```ts
["*"]
```
