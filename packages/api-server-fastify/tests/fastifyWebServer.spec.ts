// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { HttpErrorHelper, type IHttpResponse } from "@twin.org/api-models";
import { JwtMimeTypeProcessor, LoggingProcessor } from "@twin.org/api-processors";
import { NotImplementedError } from "@twin.org/core";
import {
	type ILoggingConnector,
	type ILogEntry,
	LoggingConnectorFactory
} from "@twin.org/logging-models";
import { HeaderTypes, HttpMethod, HttpStatusCode } from "@twin.org/web";
import { io } from "socket.io-client";
import { FastifyWebServer } from "../src/fastifyWebServer";

describe("api-server-fastify", () => {
	test("Can create an instance of the server", () => {
		const server = new FastifyWebServer();
		expect(server).toBeDefined();
	});

	test("Can build with no routes or processors", async () => {
		const server = new FastifyWebServer();
		await server.build();
		expect(server).toBeDefined();
	});

	test("Can fail to build with REST routes and no processors", async () => {
		const server = new FastifyWebServer();

		await expect(
			server.build(
				[],
				[
					{
						operationId: "test",
						path: "/",
						method: HttpMethod.GET,
						tag: "test",
						summary: "",
						handler: async (httpRequestContext, request) => {}
					}
				]
			)
		).rejects.toMatchObject({
			name: "GeneralError",
			message: "fastifyWebServer.noRestProcessors"
		});
	});

	test("Can build with REST routes and processors", async () => {
		const server = new FastifyWebServer();

		let counter = 0;
		await server.build(
			[
				{
					CLASS_NAME: "RouteProcessor",
					process: async (request, response, route, requestIdentity, processorState) => {
						counter++;
						const req = {
							pathParams: request.pathParams,
							query: request.query,
							body: request.body
						};
						const socketRouteResponse = await route?.handler(
							{
								...requestIdentity,
								serverRequest: request,
								processorState
							},
							req
						);
						response.headers = socketRouteResponse.headers;
						response.statusCode = socketRouteResponse.statusCode ?? HttpStatusCode.ok;
						response.body = socketRouteResponse.body;
					}
				}
			],
			[
				{
					operationId: "test",
					path: "/",
					method: HttpMethod.GET,
					tag: "test",
					summary: "",
					handler: async (httpRequestContext, request) => ({
						body: { data: "bar" }
					})
				}
			]
		);

		await server.start();

		const response = await fetch("http://localhost:3000/");
		const json = await response.json();

		expect(counter).toEqual(1);
		expect(json).toEqual({ data: "bar" });

		await server.stop();
	});

	test("Can handle an error thrown inside a REST processor", async () => {
		const server = new FastifyWebServer();

		await server.build(
			[
				{
					CLASS_NAME: "RouteProcessor",
					process: async (request, response, route, requestIdentity, processorState) => {
						HttpErrorHelper.buildResponse(
							response,
							{ name: "Error", message: "AuthError" },
							HttpStatusCode.unauthorized
						);
					}
				}
			],
			[
				{
					operationId: "test",
					path: "/",
					method: HttpMethod.GET,
					tag: "test",
					summary: "",
					handler: async (httpRequestContext, request) => ({
						body: { data: "bar" }
					})
				}
			]
		);

		await server.start();

		const response = await fetch("http://localhost:3000/");
		const json = await response.json();

		expect(response.status).toEqual(HttpStatusCode.unauthorized);
		expect(json).toEqual({ message: "AuthError", name: "Error" });

		await server.stop();
	});

	test("Can fail to build with socket routes and no processors", async () => {
		const server = new FastifyWebServer();

		await expect(
			server.build(
				undefined,
				undefined,
				[],
				[
					{
						operationId: "test",
						path: "/",
						handler: async (httpRequestContext, request) => {}
					}
				]
			)
		).rejects.toMatchObject({
			name: "GeneralError",
			message: "fastifyWebServer.noSocketProcessors"
		});
	});

	test("Can build with socket routes and processors and receive cookies in socket operations", async () => {
		const server = new FastifyWebServer({
			config: { socket: { path: "/my-sockets" } }
		});

		let connectedSocketId = "";
		let connectedCookie = "";
		let disconnectedSocketId = "";
		let disconnectedCookie = "";
		let preSocketId = "";
		let preCookie = "";
		let preData = 0;
		let processSocketId = "";
		let processCookie = "";
		let processData = 0;
		let postSocketId = "";
		let postCookie = "";
		let postData = 0;
		await server.build(
			[
				{
					CLASS_NAME: "RouteProcessor",
					process: async (request, response, route, requestIdentity, processorState) => {
						response.headers ??= {};
						response.headers[HeaderTypes.SetCookie] =
							"foo=bar; Max-Age=1000; Domain=localhost; Path=/; Expires=Tue, 01 Jul 2025 10:01:11 GMT; HttpOnly; Secure; SameSite=strict";
					}
				}
			],
			[
				{
					operationId: "test",
					path: "/cookie",
					method: HttpMethod.GET,
					tag: "test",
					summary: "",
					handler: async (httpRequestContext, request) => {}
				}
			],
			[
				{
					CLASS_NAME: "RouteProcessor",
					connected: async (request, route, processorState) => {
						connectedSocketId = processorState.socketId as string;
						connectedCookie = request.headers?.[HeaderTypes.Cookie] as string;
					},
					disconnected: async (request, route, processorState) => {
						disconnectedSocketId = processorState.socketId as string;
						disconnectedCookie = request.headers?.[HeaderTypes.Cookie] as string;
					},
					pre: async (request, response, route, requestIdentity, processorState) => {
						preSocketId = processorState.socketId as string;
						preCookie = request.headers?.[HeaderTypes.Cookie] as string;
						preData = request.body?.data as number;
					},
					process: async (
						request,
						response,
						route,
						requestIdentity,
						processorState,
						responseEmitter
					) => {
						processSocketId = processorState.socketId as string;
						processCookie = request.headers?.[HeaderTypes.Cookie] as string;
						processData = request.body?.data as number;
						await route?.handler(
							{
								...requestIdentity,
								serverRequest: request,
								processorState
							},
							{
								pathParams: request.pathParams,
								query: request.query,
								body: request.body
							},
							async (topic, socketRouteResponse) => {
								response.headers = socketRouteResponse.headers;
								response.body = socketRouteResponse.body;
								response.statusCode = socketRouteResponse.statusCode ?? HttpStatusCode.ok;
								await responseEmitter(topic, response);
							}
						);
					},
					post: async (request, response, route, requestIdentity, processorState) => {
						postSocketId = processorState.socketId as string;
						postCookie = request.headers?.[HeaderTypes.Cookie] as string;
						postData = request.body?.data as number;
					}
				}
			],
			[
				{
					operationId: "test",
					path: "/test-namespace/ping",
					handler: async (httpRequestContext, request, responseEmitter) => {
						await responseEmitter("ping", {
							body: { data: "bar" }
						});
					}
				}
			]
		);

		await server.start();

		// Need to manually get and set the cookie as we are not using a browser which would
		// automatically handle this.
		const fetchResponse = await fetch("http://localhost:3000/cookie");
		const cookie = fetchResponse.headers.get("set-cookie") ?? "";

		const socket = io("http://localhost:3000/test-namespace", {
			path: "/my-sockets",
			withCredentials: true,
			transports: ["websocket"],
			extraHeaders: { cookie }
		});

		socket.on("connect", () => {});

		for (let i = 0; i < 20; i++) {
			if (connectedSocketId.length > 0) {
				break;
			}
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		let pingResult = "";
		socket.on("ping", payload => {
			pingResult = payload.body.data;
		});

		socket.emit("ping", { body: { data: 123 } });

		for (let i = 0; i < 20; i++) {
			if (preSocketId.length > 0) {
				break;
			}
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		for (let i = 0; i < 20; i++) {
			if (pingResult.length > 0) {
				break;
			}
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		socket.close();

		for (let i = 0; i < 20; i++) {
			if (disconnectedSocketId.length > 0) {
				break;
			}
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		await server.stop();

		expect(connectedSocketId.length > 0).toBeTruthy();
		expect(connectedCookie.length > 0).toBeTruthy();
		expect(disconnectedSocketId.length > 0).toBeTruthy();
		expect(disconnectedCookie.length > 0).toBeTruthy();
		expect(preSocketId.length > 0).toBeTruthy();
		expect(preCookie.length > 0).toBeTruthy();
		expect(preData).toEqual(123);
		expect(processSocketId.length > 0).toBeTruthy();
		expect(processCookie.length > 0).toBeTruthy();
		expect(processData).toEqual(123);
		expect(postSocketId.length > 0).toBeTruthy();
		expect(postCookie.length > 0).toBeTruthy();
		expect(postData).toEqual(123);
		expect(pingResult).toBeTruthy();
	});

	test("Can handle an error thrown inside a socket processor", async () => {
		const server = new FastifyWebServer();

		await server.build(
			undefined,
			undefined,
			[
				{
					CLASS_NAME: "RouteProcessor",
					process: async (request, response, route, requestIdentity, processorState) => {
						HttpErrorHelper.buildResponse(
							response,
							{ name: "Error", message: "AuthError" },
							HttpStatusCode.unauthorized
						);
					}
				}
			],
			[
				{
					operationId: "test",
					path: "/test-namespace/ping",
					handler: async (httpRequestContext, request, responseEmitter) => {
						await responseEmitter("ping", {
							body: { data: "bar" }
						});
					}
				}
			]
		);

		await server.start();

		const socket = io("http://localhost:3000/test-namespace", {
			transports: ["websocket"],
			path: "/socket"
		});

		socket.on("connect", () => {});

		let pingResult: IHttpResponse | undefined;
		socket.on("ping", payload => {
			pingResult = payload;
		});

		socket.emit("ping", { data: 123 });

		for (let i = 0; i < 20; i++) {
			if (pingResult) {
				break;
			}
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		socket.close();

		expect(pingResult?.statusCode).toEqual(HttpStatusCode.unauthorized);
		expect(pingResult?.body).toEqual({ message: "AuthError", name: "Error" });

		await server.stop();
	});

	test("Can response on a socket with a different topic", async () => {
		const server = new FastifyWebServer();

		await server.build(
			undefined,
			undefined,
			[
				{
					CLASS_NAME: "RouteProcessor",
					process: async (
						request,
						response,
						route,
						requestIdentity,
						processorState,
						responseEmitter
					) => {
						await route?.handler(
							{
								...requestIdentity,
								serverRequest: request,
								processorState
							},
							{
								pathParams: request.pathParams,
								query: request.query,
								body: request.body
							},
							async (topic, socketRouteResponse) => {
								response.headers = socketRouteResponse.headers;
								response.body = socketRouteResponse.body;
								response.statusCode = socketRouteResponse.statusCode ?? HttpStatusCode.ok;
								await responseEmitter(topic, response);
							}
						);
					}
				}
			],
			[
				{
					operationId: "test",
					path: "/test-namespace/ping",
					handler: async (httpRequestContext, request, responseEmitter) => {
						await responseEmitter("pong", {
							body: { data: "bar" }
						});
					}
				}
			]
		);

		await server.start();

		const socket = io("http://localhost:3000/test-namespace", {
			transports: ["websocket"],
			path: "/socket"
		});

		socket.on("connect", () => {});

		let pongResult: IHttpResponse | undefined;
		socket.on("pong", payload => {
			pongResult = payload;
		});

		socket.emit("ping", { data: 123 });

		for (let i = 0; i < 20; i++) {
			if (pongResult) {
				break;
			}
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		socket.close();

		expect(pongResult).toBeTruthy();

		await server.stop();
	});

	test("Can add a custom content type processor", async () => {
		const server = new FastifyWebServer({
			mimeTypeProcessors: [new JwtMimeTypeProcessor()]
		});

		const logEntries: ILogEntry[] = [];
		let body = "";

		const logger: ILoggingConnector = {
			CLASS_NAME: "logger",
			log: async (logEntry: ILogEntry) => {
				logEntries.push(logEntry);
			},
			query: async () => {
				throw new NotImplementedError("Not implemented", "");
			}
		};

		LoggingConnectorFactory.register("logging", () => logger);

		await server.build(
			[
				{
					CLASS_NAME: "RouteProcessor",
					process: async (request, response, route, requestIdentity, processorState) => {
						body = request.body;
					}
				},
				new LoggingProcessor()
			],
			[
				{
					operationId: "test",
					path: "/",
					method: HttpMethod.POST,
					tag: "test",
					summary: "",
					handler: async (httpRequestContext, request) => {}
				}
			]
		);

		await server.start();

		await fetch("http://localhost:3000/", {
			method: "POST",
			headers: { "Content-Type": "application/jwt" },
			body: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"
		});

		expect(body).toEqual(
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"
		);
		expect(logEntries.length).toEqual(2);
		expect(logEntries[0].message.startsWith("===> POST /")).toEqual(true);
		expect(logEntries[1].message.startsWith("<===  POST")).toEqual(true);

		await server.stop();
	});
});
