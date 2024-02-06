import { LCDClient } from '@terra-money/feather.js';
import { WasmQuerier } from './WasmQuerier';
import { MarketAPI } from './api/MarketAPI';
import { NftAPI } from './api/NftAPI';

export class WasmX {
    private querier: WasmQuerier
    public readonly market: MarketAPI;
    public readonly nft: NftAPI;

    constructor(lcd: LCDClient, chainId: string) {
        this.querier = new WasmQuerier(lcd, chainId)
        this.market = new MarketAPI(this.querier)
        this.nft = new NftAPI(this.querier)
    }
}