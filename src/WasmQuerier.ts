import { Coins, CreateTxOptions, LCDClient, Msg } from "@terra-money/terra.js";
import { MessageDetail } from "./MessageDetail";

export class WasmQuerier {
    constructor(private lcd: LCDClient, public readonly chainId: string) { }

    getTax(): number {
        return this.lcd.config['tax'] || 0
    }

    async estimateFee(sender: string, messages: MessageDetail[], memo?: string, feeDenoms?: string[]): Promise<CreateTxOptions> {
        const coins = new Coins(this.lcd.config.gasPrices)
        const txOptions: CreateTxOptions = {
            msgs: messages.map(e => e.msg),
            memo: memo,
            feeDenoms: feeDenoms ?? coins.denoms()
        }

        const accountInfo = await this.lcd.auth.accountInfo(sender)
        const signer = { sequenceNumber: accountInfo.getSequenceNumber() }
        txOptions.fee = await this.lcd.tx.estimateFee([signer], txOptions);

        return txOptions
    }
}