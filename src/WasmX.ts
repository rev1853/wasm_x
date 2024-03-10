import { LCDClient } from '@terra-money/terra.js';
import { WasmQuerier } from './WasmQuerier';
import { MarketAPI } from './api/MarketAPI';
import { NftAPI } from './api/NftAPI';
import { WasmTx } from './WasmTx';
import { MessageDetail } from './MessageDetail';
import { CollectionAPI } from './api';

export class WasmX {
    private querier: WasmQuerier
    public readonly market: MarketAPI;
    public readonly nft: NftAPI;
    public readonly collection: CollectionAPI;

    constructor(lcd: LCDClient, chainId: string) {
        this.querier = new WasmQuerier(lcd, chainId)
        this.market = new MarketAPI(lcd)
        this.nft = new NftAPI(lcd)
        this.collection = new CollectionAPI(lcd)
    }

    async buildWasmTx(sender: string, messages: MessageDetail[], memo?: string) {
        const wasmTx = new WasmTx(this.querier, sender, messages, memo)
        await wasmTx.init()
        return wasmTx
    }
}