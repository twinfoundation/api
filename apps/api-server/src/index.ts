// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
/* eslint-disable no-console */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
	InformationService,
	generateRestRoutes,
	localeProcessor,
	requestLoggingProcessor,
	responseLoggingProcessor,
	routeProcessor,
	type IServerInfo
} from "@gtsc/api-core";
import type { HttpRestRouteProcessor, IRestRoute, IWebServerOptions } from "@gtsc/api-models";
import { FastifyWebServer } from "@gtsc/api-server-fastify";
import { CLIDisplay } from "@gtsc/cli-core";
import { Coerce, I18n, Is, type ILocaleDictionary } from "@gtsc/core";
import { ConsoleLoggingConnector } from "@gtsc/logging-connector-console";
import { LoggingConnectorFactory } from "@gtsc/logging-models";
import { ServiceFactory } from "@gtsc/services";
import type { HttpMethods } from "@gtsc/web";

/**
 * The main entry point for the application.
 */
async function run(): Promise<void> {
	const serverInfo: IServerInfo = {
		name: "API Server",
		version: "0.0.3-next.17"
	};

	const webServerOptions: IWebServerOptions = {
		port: Coerce.number(process.env.PORT),
		host: Coerce.string(process.env.HOST),
		methods: Is.stringValue(process.env.HTTP_METHODS)
			? (process.env.HTTP_METHODS.split(",") as HttpMethods[])
			: undefined,
		allowedHeaders: Is.stringValue(process.env.HTTP_ALLOWED_HEADERS)
			? process.env.HTTP_ALLOWED_HEADERS.split(",")
			: undefined,
		exposedHeaders: Is.stringValue(process.env.HTTP_EXPOSED_HEADERS)
			? process.env.HTTP_EXPOSED_HEADERS.split(",")
			: undefined,
		corsOrigins: Is.stringValue(process.env.CORS_ORIGINS)
			? process.env.CORS_ORIGINS.split(",")
			: undefined
	};

	CLIDisplay.header(serverInfo.name, serverInfo.version, "🌩️ ");

	const rootContent = path.dirname(fileURLToPath(import.meta.url));

	const localesDirectory = path.resolve(path.join(rootContent, "..", "locales"));
	const enLangContent = await readFile(`${localesDirectory}/en.json`, "utf8");
	I18n.addDictionary("en", JSON.parse(enLangContent) as ILocaleDictionary);

	const loggingConnector = new ConsoleLoggingConnector({
		translateMessages: true,
		hideGroups: true
	});
	LoggingConnectorFactory.register("logging", () => loggingConnector);

	const specFile = path.resolve(
		path.join(rootContent, "..", "..", "docs", "open-api", "spec.json")
	);

	const informationService = new InformationService(serverInfo, specFile);
	ServiceFactory.register("information", () => informationService);

	const webServer = new FastifyWebServer();

	const restRouteProcessors: HttpRestRouteProcessor[] = [
		localeProcessor,
		async (requestContext, request, response, route, state): Promise<void> =>
			requestLoggingProcessor(requestContext, request, response, route, state, {
				includeBody: Coerce.boolean(process.env.DEBUG) ?? false
			}),
		async (requestContext, request, response, route, state): Promise<void> =>
			routeProcessor(requestContext, request, response, route, state, {
				includeErrorStack: Coerce.boolean(process.env.DEBUG) ?? false
			}),
		async (requestContext, request, response, route, state): Promise<void> =>
			responseLoggingProcessor(requestContext, request, response, route, state, {
				includeBody: Coerce.boolean(process.env.DEBUG) ?? false
			})
	];

	const routes: IRestRoute[] = [...generateRestRoutes("", "information")];

	await webServer.build(restRouteProcessors, routes, webServerOptions);
	await webServer.start();

	for (const signal of ["SIGHUP", "SIGINT", "SIGTERM"]) {
		process.on(signal, () => webServer.stop());
	}
}

run().catch(err => console.error(err));
