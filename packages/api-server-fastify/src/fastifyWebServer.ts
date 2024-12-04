// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import FastifyCompress from "@fastify/compress";
import FastifyCors from "@fastify/cors";
import {
	HttpErrorHelper,
	type IHttpRequest,
	type IHttpRequestIdentity,
	type IHttpRequestPathParams,
	type IHttpRequestQuery,
	type IHttpResponse,
	type IHttpServerRequest,
	type IMimeTypeProcessor,
	type IRestRoute,
	type IRestRouteProcessor,
	type ISocketRoute,
	type ISocketRouteProcessor,
	type IWebServer,
	type IWebServerOptions
} from "@twin.org/api-models";
import { BaseError, GeneralError, type IError, Is, StringHelper } from "@twin.org/core";
import { type ILoggingConnector, LoggingConnectorFactory } from "@twin.org/logging-models";
import { nameof } from "@twin.org/nameof";
import { HeaderTypes, HttpMethod, HttpStatusCode, type IHttpHeaders } from "@twin.org/web";
import Fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";
import type { Server, ServerOptions, Socket } from "socket.io";
import FastifySocketIO from "./fastifySocketIo";
import type { IFastifyWebServerConfig } from "./models/IFastifyWebServerConfig";

/**
 * Implementation of the web server using Fastify.
 */
export class FastifyWebServer implements IWebServer<FastifyInstance> {
	/**
	 * Runtime name for the class in camel case.
	 * @internal
	 */
	private static readonly _CLASS_NAME_CAMEL_CASE: string =
		StringHelper.camelCase(nameof<FastifyWebServer>());

	/**
	 * Default port for running the server.
	 * @internal
	 */
	private static readonly _DEFAULT_PORT: number = 3000;

	/**
	 * Default host for running the server.
	 * @internal
	 */
	private static readonly _DEFAULT_HOST: string = "localhost";

	/**
	 * Runtime name for the class.
	 */
	public readonly CLASS_NAME: string = nameof<FastifyWebServer>();

	/**
	 * The logging connector.
	 * @internal
	 */
	private readonly _loggingConnector?: ILoggingConnector;

	/**
	 * The options for the server.
	 * @internal
	 */
	private _options?: IWebServerOptions;

	/**
	 * The Fastify instance.
	 * @internal
	 */
	private readonly _fastify: FastifyInstance;

	/**
	 * The options for the socket server.
	 * @internal
	 */
	private readonly _socketConfig: Partial<ServerOptions>;

	/**
	 * Whether the server has been started.
	 * @internal
	 */
	private _started: boolean;

	/**
	 * The mime type processors.
	 * @internal
	 */
	private readonly _mimeTypeProcessors: IMimeTypeProcessor[];

	/**
	 * Include the stack with errors.
	 * @internal
	 */
	private readonly _includeErrorStack: boolean;

	/**
	 * Create a new instance of FastifyWebServer.
	 * @param options The options for the server.
	 * @param options.loggingConnectorType The type of the logging connector to use, if undefined, no logging will happen.
	 * @param options.mimeTypeProcessors Additional MIME type processors.
	 * @param options.config Additional configuration for the server.
	 */
	constructor(options?: {
		loggingConnectorType?: string;
		config?: IFastifyWebServerConfig;
		mimeTypeProcessors?: IMimeTypeProcessor[];
	}) {
		this._loggingConnector = Is.stringValue(options?.loggingConnectorType)
			? LoggingConnectorFactory.get(options.loggingConnectorType)
			: undefined;
		this._fastify = Fastify({
			maxParamLength: 2000,
			...options?.config?.web
		});
		this._socketConfig = {
			path: "/socket",
			...options?.config?.socket
		};
		this._started = false;

		this._mimeTypeProcessors = options?.mimeTypeProcessors ?? [];
		this._includeErrorStack = options?.config?.includeErrorStack ?? false;
	}

	/**
	 * Get the web server instance.
	 * @returns The web server instance.
	 */
	public getInstance(): FastifyInstance {
		return this._fastify;
	}

	/**
	 * Build the server.
	 * @param restRouteProcessors The processors for incoming requests over REST.
	 * @param restRoutes The REST routes.
	 * @param socketRouteProcessors The processors for incoming requests over Sockets.
	 * @param socketRoutes The socket routes.
	 * @param options Options for building the server.
	 * @returns Nothing.
	 */
	public async build(
		restRouteProcessors?: IRestRouteProcessor[],
		restRoutes?: IRestRoute[],
		socketRouteProcessors?: ISocketRouteProcessor[],
		socketRoutes?: ISocketRoute[],
		options?: IWebServerOptions
	): Promise<void> {
		if (Is.arrayValue(restRoutes) && !Is.arrayValue(restRouteProcessors)) {
			throw new GeneralError(this.CLASS_NAME, "noRestProcessors");
		}
		if (Is.arrayValue(socketRoutes) && !Is.arrayValue(socketRouteProcessors)) {
			throw new GeneralError(this.CLASS_NAME, "noSocketProcessors");
		}
		await this._loggingConnector?.log({
			level: "info",
			ts: Date.now(),
			source: this.CLASS_NAME,
			message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.building`
		});

		this._options = options;

		await this._fastify.register(FastifyCompress);

		if (Is.arrayValue(socketRoutes)) {
			await this._fastify.register(FastifySocketIO, this._socketConfig);
		}

		if (Is.arrayValue(this._mimeTypeProcessors)) {
			for (const contentTypeHandler of this._mimeTypeProcessors) {
				this._fastify.addContentTypeParser(
					contentTypeHandler.getTypes(),
					{ parseAs: "buffer" },
					async (request, body, done) => {
						try {
							const processed = await contentTypeHandler.handle(body as Buffer);
							done(null, processed);
						} catch (err) {
							done(BaseError.fromError(err));
						}
					}
				);
			}
		}

		await this.initCors(options);

		this._fastify.setNotFoundHandler({}, async (request, reply) =>
			this.handleRequestRest(restRouteProcessors ?? [], request, reply)
		);

		this._fastify.setErrorHandler(async (error, request, reply) => {
			// If code property is set this is a fastify error
			// otherwise it's from our framework
			let httpStatusCode: HttpStatusCode;
			let err: IError;
			if (Is.number(error.code)) {
				err = {
					source: this.CLASS_NAME,
					name: error.name,
					message: `${error.code}: ${error.message}`
				};
				httpStatusCode = (error.statusCode as HttpStatusCode) ?? HttpStatusCode.badRequest;
			} else {
				const errorAndCode = HttpErrorHelper.processError(error);
				err = errorAndCode.error;
				httpStatusCode = errorAndCode.httpStatusCode;
			}

			await this._loggingConnector?.log({
				level: "error",
				ts: Date.now(),
				source: this.CLASS_NAME,
				message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.badRequest`,
				error: err
			});

			return reply.status(httpStatusCode).send({
				error: err
			});
		});

		await this.addRoutesRest(restRouteProcessors, restRoutes);
		await this.addRoutesSocket(socketRouteProcessors, socketRoutes);
	}

	/**
	 * Start the server.
	 * @returns Nothing.
	 */
	public async start(): Promise<void> {
		const host = this._options?.host ?? FastifyWebServer._DEFAULT_HOST;
		const port = this._options?.port ?? FastifyWebServer._DEFAULT_PORT;

		await this._loggingConnector?.log({
			level: "info",
			ts: Date.now(),
			source: this.CLASS_NAME,
			message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.starting`,
			data: {
				host,
				port
			}
		});

		if (!this._started) {
			try {
				await this._fastify.listen({ port, host });
				const addresses = this._fastify.addresses();

				const protocol = Is.object(this._fastify.initialConfig.https) ? "https://" : "http://";
				await this._loggingConnector?.log({
					level: "info",
					ts: Date.now(),
					source: this.CLASS_NAME,
					message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.started`,
					data: {
						addresses: addresses
							.map(
								a =>
									`${protocol}${a.family === "IPv6" ? "[" : ""}${a.address}${a.family === "IPv6" ? "]" : ""}:${a.port}`
							)
							.join(", ")
					}
				});
				this._started = true;
			} catch (err) {
				await this._loggingConnector?.log({
					level: "error",
					ts: Date.now(),
					source: this.CLASS_NAME,
					message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.startFailed`,
					error: BaseError.fromError(err)
				});
			}
		}
	}

	/**
	 * Stop the server.
	 * @returns Nothing.
	 */
	public async stop(): Promise<void> {
		if (this._started) {
			this._started = false;

			await this._fastify.close();

			await this._loggingConnector?.log({
				level: "info",
				ts: Date.now(),
				source: this.CLASS_NAME,
				message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.stopped`
			});
		}
	}

	/**
	 * Add the REST routes to the server.
	 * @param restRouteProcessors The processors for the incoming requests.
	 * @param restRoutes The REST routes to add.
	 * @internal
	 */
	private async addRoutesRest(
		restRouteProcessors?: IRestRouteProcessor[],
		restRoutes?: IRestRoute[]
	): Promise<void> {
		if (Is.arrayValue(restRouteProcessors) && Is.arrayValue(restRoutes)) {
			for (const restRoute of restRoutes) {
				let path = StringHelper.trimTrailingSlashes(restRoute.path);
				if (!path.startsWith("/")) {
					path = `/${path}`;
				}
				await this._loggingConnector?.log({
					level: "info",
					ts: Date.now(),
					source: this.CLASS_NAME,
					message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.restRouteAdded`,
					data: { route: path, method: restRoute.method }
				});
				const method = restRoute.method.toLowerCase() as
					| "get"
					| "post"
					| "put"
					| "patch"
					| "delete"
					| "options"
					| "head";

				this._fastify[method](path, async (request, reply) =>
					this.handleRequestRest(restRouteProcessors, request, reply, restRoute)
				);
			}
		}
	}

	/**
	 * Add the socket routes to the server.
	 * @param socketRouteProcessors The processors for the incoming requests.
	 * @param socketRoutes The socket routes to add.
	 * @internal
	 */
	private async addRoutesSocket(
		socketRouteProcessors?: ISocketRouteProcessor[],
		socketRoutes?: ISocketRoute[]
	): Promise<void> {
		if (Is.arrayValue(socketRouteProcessors) && Is.arrayValue(socketRoutes)) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const io: Server = (this._fastify as any).io;

			for (const socketRoute of socketRoutes) {
				const path = StringHelper.trimLeadingSlashes(
					StringHelper.trimTrailingSlashes(socketRoute.path)
				);
				const pathParts = path.split("/");
				await this._loggingConnector?.log({
					level: "info",
					ts: Date.now(),
					source: this.CLASS_NAME,
					message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.socketRouteAdded`,
					data: { route: `/${path}` }
				});

				const socketNamespace = io.of(`/${pathParts[0]}`);
				const topic = pathParts.slice(1).join("/");

				socketNamespace.on("connection", async socket => {
					const httpServerRequest: IHttpServerRequest = {
						method: HttpMethod.GET,
						url: socket.handshake.url,
						query: socket.handshake.query as IHttpRequestQuery,
						headers: socket.handshake.headers as IHttpHeaders
					};

					// Pass the connected information on to any processors
					try {
						const processorState = {
							socketId: socket.id
						};
						for (const socketRouteProcessor of socketRouteProcessors) {
							if (Is.function(socketRouteProcessor.connected)) {
								await socketRouteProcessor.connected(
									httpServerRequest,
									socketRoute,
									processorState
								);
							}
						}
					} catch (err) {
						const { error, httpStatusCode } = HttpErrorHelper.processError(
							err,
							this._includeErrorStack
						);
						const response: IHttpResponse = {};
						HttpErrorHelper.buildResponse(response, error, httpStatusCode);
						socket.emit(topic, response);
					}

					socket.on("disconnect", async () => {
						try {
							const processorState = {
								socketId: socket.id
							};
							// The socket disconnected so notify any processors
							for (const socketRouteProcessor of socketRouteProcessors) {
								if (Is.function(socketRouteProcessor.disconnected)) {
									await socketRouteProcessor.disconnected(
										httpServerRequest,
										socketRoute,
										processorState
									);
								}
							}
						} catch {
							// If something fails on a disconnect there is not much we can do with it
						}
					});

					// Handle any incoming messages
					socket.on(topic, async data => {
						await this.handleRequestSocket(
							socketRouteProcessors,
							socketRoute,
							socket,
							`/${pathParts.join("/")}`,
							topic,
							data
						);
					});
				});
			}
		}
	}

	/**
	 * Handle the incoming REST request.
	 * @param restRouteProcessors The hooks to process the incoming requests.
	 * @param request The incoming request.
	 * @param reply The outgoing response.
	 * @param restRoute The REST route to handle.
	 * @internal
	 */
	private async handleRequestRest(
		restRouteProcessors: IRestRouteProcessor[],
		request: FastifyRequest,
		reply: FastifyReply,
		restRoute?: IRestRoute
	): Promise<FastifyReply> {
		const httpServerRequest: IHttpServerRequest = {
			method: request.method.toUpperCase() as HttpMethod,
			url: `${request.protocol}://${request.hostname}${request.url}`,
			body: request.body,
			query: request.query as IHttpRequestQuery,
			pathParams: request.params as IHttpRequestPathParams,
			headers: request.headers as IHttpHeaders
		};
		const httpResponse: IHttpResponse = {};
		const httpRequestIdentity: IHttpRequestIdentity = {};
		const processorState = {};

		await this.runProcessorsRest(
			restRouteProcessors,
			restRoute,
			httpServerRequest,
			httpResponse,
			httpRequestIdentity,
			processorState
		);

		if (!Is.empty(httpResponse.headers)) {
			for (const header of Object.keys(httpResponse.headers)) {
				reply.header(header, httpResponse.headers[header]);
			}
		}
		return reply
			.status((httpResponse.statusCode ?? HttpStatusCode.ok) as number)
			.send(httpResponse.body);
	}

	/**
	 * Run the REST processors for the route.
	 * @param restRouteProcessors The processors to run.
	 * @param restRoute The route to process.
	 * @param httpServerRequest The incoming request.
	 * @param httpResponse The outgoing response.
	 * @param httpRequestIdentity The identity context for the request.
	 * @internal
	 */
	private async runProcessorsRest(
		restRouteProcessors: IRestRouteProcessor[],
		restRoute: IRestRoute | undefined,
		httpServerRequest: IHttpServerRequest,
		httpResponse: IHttpResponse,
		httpRequestIdentity: IHttpRequestIdentity,
		processorState: {
			[id: string]: unknown;
		}
	): Promise<void> {
		try {
			for (const routeProcessor of restRouteProcessors) {
				if (Is.function(routeProcessor.pre)) {
					await routeProcessor.pre(
						httpServerRequest,
						httpResponse,
						restRoute,
						httpRequestIdentity,
						processorState
					);
				}
			}

			for (const routeProcessor of restRouteProcessors) {
				if (Is.function(routeProcessor.process)) {
					await routeProcessor.process(
						httpServerRequest,
						httpResponse,
						restRoute,
						httpRequestIdentity,
						processorState
					);
				}
			}

			for (const routeProcessor of restRouteProcessors) {
				if (Is.function(routeProcessor.post)) {
					await routeProcessor.post(
						httpServerRequest,
						httpResponse,
						restRoute,
						httpRequestIdentity,
						processorState
					);
				}
			}
		} catch (err) {
			const { error, httpStatusCode } = HttpErrorHelper.processError(err, this._includeErrorStack);
			HttpErrorHelper.buildResponse(httpResponse, error, httpStatusCode);
		}
	}

	/**
	 * Handle the incoming socket request.
	 * @param socketRouteProcessors The hooks to process the incoming requests.
	 * @param socketRoute The socket route to handle.
	 * @param socket The socket to handle.
	 * @param fullPath The full path of the socket route.
	 * @param emitTopic The topic to emit the response on.
	 * @param data The incoming data.
	 * @internal
	 */
	private async handleRequestSocket(
		socketRouteProcessors: ISocketRouteProcessor[],
		socketRoute: ISocketRoute,
		socket: Socket,
		fullPath: string,
		emitTopic: string,
		request: IHttpRequest
	): Promise<void> {
		const httpServerRequest: IHttpServerRequest = {
			method: HttpMethod.GET,
			url: fullPath,
			query: socket.handshake.query as IHttpRequestQuery,
			headers: socket.handshake.headers as IHttpHeaders,
			body: request.body
		};
		const httpResponse: IHttpResponse = {};
		const httpRequestIdentity: IHttpRequestIdentity = {};
		const processorState = {
			socketId: socket.id
		};

		delete httpServerRequest.query?.EIO;
		delete httpServerRequest.query?.transport;

		await this.runProcessorsSocket(
			socketRouteProcessors,
			socketRoute,
			httpServerRequest,
			httpResponse,
			httpRequestIdentity,
			processorState,
			emitTopic,
			async (topic, response) => {
				await socket.emit(topic, response);
			}
		);
	}

	/**
	 * Run the socket processors for the route.
	 * @param socketRouteProcessors The processors to run.
	 * @param socketRoute The route to process.
	 * @param httpServerRequest The incoming request.
	 * @param httpResponse The outgoing response.
	 * @param httpRequestIdentity The identity context for the request.
	 * @param processorState The state handed through the processors.
	 * @param requestTopic The topic of the request.
	 * @internal
	 */
	private async runProcessorsSocket(
		socketRouteProcessors: ISocketRouteProcessor[],
		socketRoute: ISocketRoute,
		httpServerRequest: IHttpServerRequest,
		httpResponse: IHttpResponse,
		httpRequestIdentity: IHttpRequestIdentity,
		processorState: {
			[id: string]: unknown;
		},
		requestTopic: string,
		responseEmitter: (topic: string, response: IHttpResponse) => Promise<void>
	): Promise<void> {
		// Custom emit method which will also call the post processors
		const postProcessEmit = async (
			topic: string,
			response: IHttpResponse,
			responseProcessorState: {
				[id: string]: unknown;
			}
		): Promise<void> => {
			await responseEmitter(topic, response);

			try {
				// The post processors are called after the response has been emitted
				for (const postSocketRouteProcessor of socketRouteProcessors) {
					if (Is.function(postSocketRouteProcessor.post)) {
						await postSocketRouteProcessor.post(
							httpServerRequest,
							response,
							socketRoute,
							httpRequestIdentity,
							responseProcessorState
						);
					}
				}
			} catch (err) {
				this._loggingConnector?.log({
					level: "error",
					ts: Date.now(),
					source: this.CLASS_NAME,
					message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.postProcessorError`,
					error: BaseError.fromError(err),
					data: {
						route: socketRoute.path
					}
				});
			}
		};

		try {
			for (const socketRouteProcessor of socketRouteProcessors) {
				if (Is.function(socketRouteProcessor.pre)) {
					await socketRouteProcessor.pre(
						httpServerRequest,
						httpResponse,
						socketRoute,
						httpRequestIdentity,
						processorState
					);
				}
			}

			// We always call all the processors regardless of any response set by a previous processor.
			// But if a pre processor sets a status code, we will emit the response manually, as the pre
			// and post processors do not receive the emit method, they just populate the response object.
			if (!Is.empty(httpResponse.statusCode)) {
				await postProcessEmit(requestTopic, httpResponse, processorState);
			}

			for (const socketRouteProcessor of socketRouteProcessors) {
				if (Is.function(socketRouteProcessor.process)) {
					await socketRouteProcessor.process(
						httpServerRequest,
						httpResponse,
						socketRoute,
						httpRequestIdentity,
						processorState,
						async (topic: string, processResponse: IHttpResponse) => {
							await postProcessEmit(topic, processResponse, processorState);
						}
					);
				}
			}

			// If the processors set the status to any kind of error then we should emit this manually
			if (
				Is.integer(httpResponse.statusCode) &&
				httpResponse.statusCode >= HttpStatusCode.badRequest
			) {
				await postProcessEmit(requestTopic, httpResponse, processorState);
			}
		} catch (err) {
			// Emit any unhandled errors manually
			const { error, httpStatusCode } = HttpErrorHelper.processError(err, this._includeErrorStack);
			HttpErrorHelper.buildResponse(httpResponse, error, httpStatusCode);
			await postProcessEmit(requestTopic, httpResponse, processorState);
		}
	}

	/**
	 * Initialize the cors options.
	 * @param options The web server options.
	 * @internal
	 */
	private async initCors(options?: IWebServerOptions): Promise<void> {
		let origins: string[] = ["*"];

		if (Is.arrayValue(options?.corsOrigins)) {
			origins = options?.corsOrigins;
		} else if (Is.stringValue(options?.corsOrigins)) {
			origins = [options?.corsOrigins];
		}

		const hasWildcardOrigin = origins.includes("*");

		const methods = options?.methods ?? [
			HttpMethod.GET,
			HttpMethod.PUT,
			HttpMethod.POST,
			HttpMethod.DELETE,
			HttpMethod.OPTIONS
		];
		const allowedHeaders = [
			"Access-Control-Allow-Origin",
			"Content-Encoding",
			"Accept-Encoding",
			HeaderTypes.ContentType,
			HeaderTypes.Authorization,
			HeaderTypes.Accept
		];
		const exposedHeaders: string[] = [HeaderTypes.ContentDisposition, HeaderTypes.Location];

		if (Is.arrayValue(options?.allowedHeaders)) {
			allowedHeaders.push(...options.allowedHeaders);
		}
		if (Is.arrayValue(options?.exposedHeaders)) {
			exposedHeaders.push(...options.exposedHeaders);
		}

		await this._fastify.register(FastifyCors, {
			origin: (origin, callback) => {
				callback(null, hasWildcardOrigin ? true : origins.includes(origin as string));
			},
			methods,
			allowedHeaders,
			exposedHeaders,
			credentials: true
		});
	}
}
