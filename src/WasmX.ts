import { LCDClient } from '@terra-money/feather.js';
import { WasmQuerier } from './WasmQuerier';
import { MarketAPI } from './api/MarketAPI';

export class WasmX {
    private querier: WasmQuerier
    public readonly market: MarketAPI;

    constructor(lcd: LCDClient, chainId: string) {
        this.querier = new WasmQuerier(lcd)
        this.market = new MarketAPI(this.querier, chainId)
    }
}

export class ApiError extends Error {
    constructor() {
        super("Error ngab")
    }
}
