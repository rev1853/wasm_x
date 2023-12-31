import { Coin, Coins, CreateTxOptions, LCDClient, Msg } from "@terra-money/feather.js";

export class WasmQuerier {
    constructor(private lcd: LCDClient) { }

    async query<T>(address: string, command: string, data: object) {
        const query = {};
        query[command] = data;

        return await this.lcd.wasm.contractQuery<T>(address, query)
    }

    async estimateFee(sender: string, txOptions: CreateTxOptions) {
        const accountInfo = await this.lcd.auth.accountInfo(sender)
        const signer = { address: sender, sequenceNumber: accountInfo.getSequenceNumber() }
        const fee = await this.lcd.tx.estimateFee([signer], txOptions);

        return fee
    }
}