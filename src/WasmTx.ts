import { Coin, Coins, CreateTxOptions, Fee, Msg } from "@terra-money/feather.js";
import { WasmQuerier } from "./WasmQuerier";
import { MessageDetail } from "./MessageDetail";

export class WasmTx {

    constructor(
        public readonly tx: CreateTxOptions,
        public readonly messages: MessageDetail[],
        public tax: number = 0,
    ) { }

    getTotalAmount() {
        return this.getMsgs().map(msg => {
            for (const key in msg) {
                if (msg[key] === undefined) continue

                if (msg[key] instanceof Coins) {
                    const coins: Coins = msg[key]
                    if (coins.denoms().length > 0) return coins
                }

                if (msg[key] instanceof Coin) return new Coins([msg[key]])
            }
            return new Coins()
        }).reduce((prev, curr) => prev.add(curr));
    }

    getTotalFee() {
        return this.tx.fee.amount ?? new Coins()
    }

    getTotalTax() {
        return this.getTotalAmount().mul(this.tax)
    }

    getMsgs(): Msg[] {
        return this.messages.map(e => e.msg)
    }

    getTxOptions(feeCoins: Coin): CreateTxOptions {
        const coins = this.getTotalTax().add(feeCoins)
        const fee = new Fee(this.tx.fee?.gas_limit, coins)
        return {
            ...this.tx,
            fee
        }
    }
}
