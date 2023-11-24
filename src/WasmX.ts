import { LCDClient } from '@terra-money/feather.js';
import { WasmQuerier } from './WasmQuerier';

export class WasmX {
    readonly querier: WasmQuerier

    constructor(lcd: LCDClient, chainId: string) {
        this.querier = new WasmQuerier(lcd, chainId)
    }
}

export class ApiError extends Error {
    constructor() {
        super("Error ngab")
    }
}