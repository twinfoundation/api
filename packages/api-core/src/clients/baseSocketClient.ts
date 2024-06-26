// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.

import type { IBaseSocketClientConfig } from "@gtsc/api-models";
import { BaseError, Guards, Is, StringHelper, type IError } from "@gtsc/core";
import { nameof } from "@gtsc/nameof";
import type { IRequestContext } from "@gtsc/services";
import lookup, { type Socket } from "socket.io-client";

/**
 * Event bus which publishes using web-sockets.
 */
export abstract class BaseSocketClient {
	/**
	 * The name of the class implementation socket calls.
	 * @internal
	 */
	private readonly _implementationName: string;

	/**
	 * The endpoint with prefix to send the requests to.
	 * @internal
	 */
	private readonly _endpointWithPrefix: string;

	/**
	 * The web socket to communicate on.
	 * @internal
	 */
	private readonly _socket: Socket;

	/**
	 * Create a new instance of BaseSocketClient.
	 * @param implementationName The name of the class implementation socket calls.
	 * @param config The configuration for the client.
	 * @param pathPrefix The default prefix to use if none in configuration.
	 */
	constructor(implementationName: string, config: IBaseSocketClientConfig, pathPrefix: string) {
		Guards.stringValue(implementationName, nameof(implementationName), implementationName);
		Guards.object<IBaseSocketClientConfig>(implementationName, nameof(config), config);
		Guards.stringValue(implementationName, nameof(config.endpoint), config.endpoint);

		this._implementationName = implementationName;
		this._endpointWithPrefix = StringHelper.trimTrailingSlashes(config.endpoint);

		const finalPathPrefix = config.pathPrefix ?? pathPrefix;
		if (Is.stringValue(finalPathPrefix)) {
			this._endpointWithPrefix += `/${finalPathPrefix}`;
		}

		this._socket = lookup(this._endpointWithPrefix, {
			upgrade: true,
			transports: ["websocket"],
			autoConnect: false,
			query: config.headers
		});
	}

	/**
	 * Setup a handler for a message from the socket.
	 * @param message The message to look for.
	 * @param callback The method to call when the message arrives.
	 */
	protected onMessage<T>(message: string, callback: (data: T) => Promise<void>): void {
		this._socket.on(message, callback);
	}

	/**
	 * Send a message on the socket.
	 * @param message The message to send.
	 * @param data The data to send with the message.
	 */
	protected sendMessage<T>(message: string, data: T): void {
		this._socket.emit(message, data);
	}

	/**
	 * Connect the socket if its not already connected.
	 * @param requestContext The context for the request.
	 * @returns True if the socket is already connected.
	 */
	protected socketConnect(requestContext: IRequestContext): boolean {
		if (!this._socket.connected) {
			this._socket.connect();

			// If reconnect fails then also try polling mode.
			this._socket.on("reconnect_attempt", () => {
				this._socket.io.opts.transports = ["polling", "websocket"];
			});

			this._socket.on("connect_error", async err => {
				await this.handleError(requestContext, BaseError.fromError(err));
			});

			this._socket.on("connect", async () => {
				await this.handleConnected();
			});

			return false;
		}

		return true;
	}

	/**
	 * Disconnect the socket if its connected.
	 */
	protected socketDisconnect(): void {
		this._socket.disconnect();
	}

	/**
	 * Is the socket connected.
	 * @returns True if the socket is connected.
	 */
	protected isConnected(): boolean {
		return this._socket.connected;
	}

	/**
	 * Handle the socket connection.
	 */
	protected abstract handleConnected(): Promise<void>;

	/**
	 * Handle an error.
	 * @param requestContext The context for the request.
	 * @param err The error to handle.
	 */
	protected abstract handleError(requestContext: IRequestContext, err: IError): Promise<void>;
}
