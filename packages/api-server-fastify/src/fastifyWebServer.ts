// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import FastifyCompress from "@fastify/compress";
import FastifyCors from "@fastify/cors";
import type {
	HttpRestRouteProcessor,
	IHttpRequest,
	IHttpRequestPathParams,
	IHttpRequestQuery,
	IHttpResponse,
	IRestRoute,
	IWebServer,
	IWebServerOptions
} from "@gtsc/api-models";
import { BaseError, I18n, Is, StringHelper } from "@gtsc/core";
import { LoggingConnectorFactory, type ILoggingConnector } from "@gtsc/logging-models";
import { nameof } from "@gtsc/nameof";
import { RequestContextHelper, type IRequestContext } from "@gtsc/services";
import { type HttpMethods, HttpStatusCodes, type IHttpRequestHeaders } from "@gtsc/web";
import Fastify, { type FastifyReply, type FastifyInstance, type FastifyRequest } from "fastify";

/**
 * Implementation of the web server using Fastify.
 */
export class FastifyWebServer implements IWebServer {
	/**
	 * Runtime name for the class.
	 * @internal
	 */
	private static readonly _CLASS_NAME: string = nameof<FastifyWebServer>();

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
	 * The logging connector.
	 * @internal
	 */
	private readonly _logging?: ILoggingConnector;

	/**
	 * The options for the server.
	 * @internal
	 */
	private _options?: IWebServerOptions;

	/**
	 * The Fastify instance.
	 * @internal
	 */
	private _fastify?: FastifyInstance;

	/**
	 * Create a new instance of FastifyWebServer.
	 * @param options Options for the server.
	 * @param options.loggingConnectorType The type of logging connector to use, defaults to "logging".
	 */
	constructor(options?: { loggingConnectorType?: string }) {
		this._logging = LoggingConnectorFactory.getIfExists(options?.loggingConnectorType ?? "logging");
	}

	/**
	 * Build the server.
	 * @param restRouteProcessors The hooks to process the incoming requests.
	 * @param restRoutes The REST routes.
	 * @param options Options for building the server.
	 * @returns Nothing.
	 */
	public async build(
		restRouteProcessors: HttpRestRouteProcessor[],
		restRoutes: IRestRoute[],
		options?: IWebServerOptions
	): Promise<void> {
		await this._logging?.log(RequestContextHelper.SYSTEM_CONTEXT, {
			level: "info",
			ts: Date.now(),
			source: FastifyWebServer._CLASS_NAME,
			message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.building`
		});

		this._options = options;
		this._fastify = Fastify();

		await this._fastify.register(FastifyCompress);

		let origins: string[] = ["*"];

		if (Is.arrayValue(options?.corsOrigins)) {
			origins = options?.corsOrigins;
		} else if (Is.stringValue(options?.corsOrigins)) {
			origins = [options?.corsOrigins];
		}

		const hasWildcardOrigin = origins.includes("*");

		const methods = options?.methods ?? ["GET", "PUT", "POST", "DELETE", "OPTIONS"];
		const allowedHeaders = options?.allowedHeaders ?? [
			"Access-Control-Allow-Origin",
			"Content-Type",
			"Content-Encoding",
			"Authorization",
			"Accept",
			"Accept-Encoding"
		];
		const exposedHeaders = options?.exposedHeaders ?? ["Content-Disposition"];

		await this._fastify.register(FastifyCors, {
			origin: (origin, callback) => {
				callback(null, hasWildcardOrigin ? true : origins.includes(origin as string));
			},
			methods,
			allowedHeaders,
			exposedHeaders,
			credentials: true
		});

		this._fastify.setNotFoundHandler({}, async (request, reply) => {
			await this.handleRequest(request, reply, restRouteProcessors);
		});

		this._fastify.setErrorHandler(async (error, request, reply) => {
			await this._logging?.log(RequestContextHelper.SYSTEM_CONTEXT, {
				level: "error",
				ts: Date.now(),
				source: FastifyWebServer._CLASS_NAME,
				message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.badRequest`,
				data: error
			});
			return reply.status(HttpStatusCodes.BAD_REQUEST).send({
				error: I18n.formatMessage(`${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.badRequest`, {
					error: error.message
				})
			});
		});

		// Add the routes to the server.
		for (const restRoute of restRoutes) {
			let path = StringHelper.trimTrailingSlashes(restRoute.path);
			if (!path.startsWith("/")) {
				path = `/${path}`;
			}
			await this._logging?.log(RequestContextHelper.SYSTEM_CONTEXT, {
				level: "info",
				ts: Date.now(),
				source: FastifyWebServer._CLASS_NAME,
				message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.restRouteAdded`,
				data: { route: path }
			});
			const method = restRoute.method.toLowerCase() as
				| "get"
				| "post"
				| "put"
				| "patch"
				| "delete"
				| "options"
				| "head";

			this._fastify[method](path, async (request, reply) => {
				await this.handleRequest(request, reply, restRouteProcessors, restRoute);
			});
		}
	}

	/**
	 * Start the server.
	 * @returns Nothing.
	 */
	public async start(): Promise<void> {
		const host = this._options?.host ?? FastifyWebServer._DEFAULT_HOST;
		const port = this._options?.port ?? FastifyWebServer._DEFAULT_PORT;

		await this._logging?.log(RequestContextHelper.SYSTEM_CONTEXT, {
			level: "info",
			ts: Date.now(),
			source: FastifyWebServer._CLASS_NAME,
			message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.starting`,
			data: {
				host,
				port
			}
		});

		if (this._fastify) {
			try {
				await this._fastify.listen({ port, host });
				const addresses = this._fastify.addresses();

				const protocol = Is.object(this._fastify.initialConfig.https) ? "https://" : "http://";
				await this._logging?.log(RequestContextHelper.SYSTEM_CONTEXT, {
					level: "info",
					ts: Date.now(),
					source: FastifyWebServer._CLASS_NAME,
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
			} catch (err) {
				await this._logging?.log(RequestContextHelper.SYSTEM_CONTEXT, {
					level: "error",
					ts: Date.now(),
					source: FastifyWebServer._CLASS_NAME,
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
		if (this._fastify) {
			await this._fastify.close();
			this._fastify = undefined;

			await this._logging?.log(RequestContextHelper.SYSTEM_CONTEXT, {
				level: "info",
				ts: Date.now(),
				source: FastifyWebServer._CLASS_NAME,
				message: `${FastifyWebServer._CLASS_NAME_CAMEL_CASE}.stopped`
			});
		}
	}

	/**
	 * Handle the incoming request.
	 * @param request The incoming request.
	 * @param reply The outgoing response.
	 * @param restRouteProcessors The hooks to process the incoming requests.
	 * @param restRoute The REST route to handle.
	 * @internal
	 */
	private async handleRequest(
		request: FastifyRequest,
		reply: FastifyReply,
		restRouteProcessors: HttpRestRouteProcessor[],
		restRoute?: IRestRoute
	): Promise<void> {
		const httpRequest: IHttpRequest = {
			method: request.method.toUpperCase() as HttpMethods,
			url: `${request.protocol}://${request.hostname}${request.url}`,
			body: request.body,
			query: request.query as IHttpRequestQuery,
			pathParams: request.params as IHttpRequestPathParams,
			headers: request.headers as IHttpRequestHeaders
		};
		const httpResponse: IHttpResponse = {};
		const requestContext: IRequestContext = {};
		const processorState = {};
		for (const restRouteProcessor of restRouteProcessors) {
			await restRouteProcessor(
				requestContext,
				httpRequest,
				httpResponse,
				restRoute,
				processorState
			);
		}
		if (!Is.empty(httpResponse.headers)) {
			for (const header of Object.keys(httpResponse.headers)) {
				reply.header(header, httpResponse.headers[header]);
			}
		}
		reply.status((httpResponse.statusCode ?? HttpStatusCodes.OK) as number).send(httpResponse.body);
	}
}
