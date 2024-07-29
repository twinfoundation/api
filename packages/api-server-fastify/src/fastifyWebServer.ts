// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import FastifyCompress from "@fastify/compress";
import FastifyCors from "@fastify/cors";
import type {
	IHttpRequestPathParams,
	IHttpRequestQuery,
	IHttpResponse,
	IHttpRestRouteProcessor,
	IHttpServerRequest,
	IRestRoute,
	IWebServer,
	IWebServerOptions
} from "@gtsc/api-models";
import { BaseError, type IError, Is, StringHelper } from "@gtsc/core";
import { type ILoggingConnector, LoggingConnectorFactory } from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";
import type { IServiceRequestContext } from "@gtsc/services";
import { type HttpMethod, HttpStatusCode, type IHttpRequestHeaders } from "@gtsc/web";
import Fastify, { type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";

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
	 * Whether the server has been started.
	 * @internal
	 */
	private _started: boolean;

	/**
	 * Create a new instance of FastifyWebServer.
	 * @param options The options for the server.
	 * @param options.loggingConnectorType The type of the logging connector to use, if undefined, no logging will happen.
	 */
	constructor(options?: { loggingConnectorType?: string }) {
		this._loggingConnector = Is.stringValue(options?.loggingConnectorType)
			? LoggingConnectorFactory.get(options.loggingConnectorType)
			: undefined;
		this._fastify = Fastify({ maxParamLength: 2000 });
		this._started = false;
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
	 * @param restRouteProcessors The hooks to process the incoming requests.
	 * @param restRoutes The REST routes.
	 * @param options Options for building the server.
	 * @returns Nothing.
	 */
	public async build(
		restRouteProcessors: IHttpRestRouteProcessor[],
		restRoutes: IRestRoute[],
		options?: IWebServerOptions
	): Promise<void> {
		await this._loggingConnector?.log({
			level: "info",
			ts: Date.now(),
			source: this.CLASS_NAME,
			message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.building`
		});

		this._options = options;

		await this._fastify.register(FastifyCompress);

		await this.initCors(options);

		this._fastify.setNotFoundHandler({}, async (request, reply) =>
			this.handleRequest(restRouteProcessors, request, reply)
		);

		this._fastify.setErrorHandler(async (error, request, reply) => {
			const err: IError = {
				source: this.CLASS_NAME,
				name: error.name,
				message: `${error.code}: ${error.message}`
			};
			const statusCode = error.statusCode ?? HttpStatusCode.badRequest;

			await this._loggingConnector?.log({
				level: "error",
				ts: Date.now(),
				source: this.CLASS_NAME,
				message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.badRequest`,
				data: {
					error: err.message
				}
			});

			return reply.status(statusCode).send({
				error: err
			});
		});

		// Add the routes to the server.
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
				this.handleRequest(restRouteProcessors, request, reply, restRoute)
			);
		}
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
	 * Handle the incoming request.
	 * @param restRouteProcessors The hooks to process the incoming requests.
	 * @param request The incoming request.
	 * @param reply The outgoing response.
	 * @param restRoute The REST route to handle.
	 * @internal
	 */
	private async handleRequest(
		restRouteProcessors: IHttpRestRouteProcessor[],
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
			headers: request.headers as IHttpRequestHeaders
		};
		const httpResponse: IHttpResponse = {};
		const requestContext: IServiceRequestContext = {};
		const processorState = {};

		for (const restRouteProcessor of restRouteProcessors) {
			await restRouteProcessor.process(
				httpServerRequest,
				httpResponse,
				restRoute,
				requestContext,
				processorState
			);
		}

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

		const methods = options?.methods ?? ["GET", "PUT", "POST", "DELETE", "OPTIONS"];
		const allowedHeaders = [
			"Access-Control-Allow-Origin",
			"Content-Type",
			"Content-Encoding",
			"Authorization",
			"Accept",
			"Accept-Encoding"
		];
		const exposedHeaders = ["Content-Disposition"];

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
