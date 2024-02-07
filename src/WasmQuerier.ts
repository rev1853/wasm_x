import { CreateTxOptions, LCDClient, Msg } from "@terra-money/feather.js";
import { MessageDetail } from "./MessageDetail";

export class WasmQuerier {
    constructor(private lcd: LCDClient, public readonly chainId: string) { }

    getTax(): number {
        return this.lcd.config[this.chainId]['tax'] || 0
    }

    async estimateFee(sender: string, messages: MessageDetail[], memo?: string): Promise<CreateTxOptions> {
        const txOptions: CreateTxOptions = {
            chainID: this.chainId,
            msgs: messages.map(e => e.msg),
            memo: memo
        }

        const accountInfo = await this.lcd.auth.accountInfo(sender)
        const signer = { address: sender, sequenceNumber: accountInfo.getSequenceNumber() }
        txOptions.fee = await this.lcd.tx.estimateFee([signer], txOptions);

        return txOptions
    }
}