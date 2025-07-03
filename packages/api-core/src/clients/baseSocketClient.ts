// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IBaseSocketClientConfig, IHttpRequest, IHttpResponse } from "@twin.org/api-models";
import { BaseError, Guards, Is, StringHelper, type IError } from "@twin.org/core";
import { nameof } from "@twin.org/nameof";
import { HttpStatusCode } from "@twin.org/web";
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
			path: config.basePath ?? "/socket",
			upgrade: true,
			transports: ["websocket"],
			autoConnect: false,
			query: config.headers
		});
	}

	/**
	 * Setup a handler for an event from the socket.
	 * @param event The event to look for.
	 * @param callback The method to call when the event arrives.
	 */
	protected onEvent<T extends IHttpResponse>(
		event: string,
		callback: (response: T) => Promise<void>
	): void {
		this._socket.on(event, async (response: T) => {
			if ((response.statusCode ?? HttpStatusCode.ok) >= HttpStatusCode.badRequest) {
				await this.handleError(BaseError.fromError(response.body));
			} else {
				await callback(response);
			}
		});
	}

	/**
	 * Remove a handler for a event from the socket.
	 * @param event The event to look for.
	 */
	protected offEvent(event: string): void {
		this._socket.off(event);
	}

	/**
	 * Send a event on the socket.
	 * @param event The event to send.
	 * @param data The data to send with the event.
	 */
	protected sendEvent<T extends IHttpRequest>(event: string, data: T): void {
		this._socket.emit(event, data);
	}

	/**
	 * Connect the socket if its not already connected.
	 * @returns True if the socket is already connected.
	 */
	protected socketConnect(): boolean {
		if (!this._socket.connected) {
			this._socket.connect();

			// If reconnect fails then also try polling mode.
			this._socket.on("reconnect_attempt", () => {
				this._socket.io.opts.transports = ["polling", "websocket"];
			});

			this._socket.on("connect_error", async err => {
				await this.handleError(BaseError.fromError(err));
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
	 * @param err The error to handle.
	 */
	protected abstract handleError(err: IError): Promise<void>;
}
