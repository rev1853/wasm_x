import { LCDClient } from '@terra-money/feather.js';
import { WasmQuerier } from './WasmQuerier';
import { MarketAPI } from './api/MarketAPI';
import { NftAPI } from './api/NftAPI';
import { WasmTx } from './WasmTx';
import { MessageDetail } from './MessageDetail';

export class WasmX {
    private querier: WasmQuerier
    public readonly market: MarketAPI;
    public readonly nft: NftAPI;

    constructor(lcd: LCDClient, chainId: string) {
        this.querier = new WasmQuerier(lcd, chainId)
        this.market = new MarketAPI()
        this.nft = new NftAPI()
    }

    async buildWasmTx(sender: string, messages: MessageDetail[], memo?: string) {
        const txOptions = await this.querier.estimateFee(sender, messages, memo)
        return new WasmTx(txOptions, messages, this.querier.getTax())
    }
}