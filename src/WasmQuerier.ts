import { Coin, Coins, LCDClient, Msg } from "@terra-money/feather.js";
import { TxRequest } from "./dto/request/TxRequest";

export class WasmQuerier {
    constructor(private lcd: LCDClient, private chainId: string) { }

    async query<T>(address: string, command: string, data: object) {
        const query = {};
        query[command] = data;

        return await this.lcd.wasm.contractQuery<T>(address, query)
    }

    async estimateFee(sender: string, txRequest: TxRequest) {
        const accountInfo = await this.lcd.auth.accountInfo(sender)
        const signer = { address: sender, sequenceNumber: accountInfo.getSequenceNumber() }
        const fee = await this.lcd.tx.estimateFee([signer], txRequest);

        return fee
    }


    countTax(msgs: Msg[]) {
        const coins = msgs.map(msg => {
            if ('amount' in msg) return msg.amount instanceof Coin ? new Coins([msg.amount]) : msg.amount
            return new Coins()
        }).reduce((prev, curr) => prev.add(curr))

        return coins
    }
}