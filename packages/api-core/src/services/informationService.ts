// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import type { IRequestContext, IService } from "@gtsc/services";
import type { IServerInfo } from "../models/IServerInfo";

/**
 * The information service for the server.
 */
export class InformationService implements IService {
	/**
	 * The server information.
	 * @internal
	 */
	private readonly _serverInfo: IServerInfo;

	/**
	 * Create a new instance of InformationService.
	 * @param serverInfo The server information.
	 */
	constructor(serverInfo: IServerInfo) {
		this._serverInfo = serverInfo;
	}

	/**
	 * Bootstrap the service by creating and initializing any resources it needs.
	 * @param requestContext The request context for bootstrapping.
	 * @returns Nothing.
	 */
	public async bootstrap?(requestContext: IRequestContext): Promise<void> {}

	/**
	 * Get the server information.
	 * @returns the service information.
	 */
	public async serverInformation(): Promise<IServerInfo> {
		return this._serverInfo;
	}
}
