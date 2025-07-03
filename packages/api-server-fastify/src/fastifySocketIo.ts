// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { Server, type ServerOptions } from "socket.io";

// This is a clone of fastify-socket.io which runs with recent fastify versions.
const fastifySocketIO: FastifyPluginAsync<Partial<ServerOptions>> = fp(
	async (fastify: FastifyInstance, opts: Partial<ServerOptions>) => {
		const ioServer = new Server(fastify.server, opts);

		fastify.decorate("io", ioServer);
		fastify.addHook("preClose", done => {
			ioServer.disconnectSockets();
			ioServer.close();
			done();
		});
	},
	{ fastify: ">=5.x.x", name: "socket.io" }
);

export default fastifySocketIO;
