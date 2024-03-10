import { Coin, Coins, CreateTxOptions, Fee, Msg } from "@terra-money/terra.js";
import { WasmQuerier } from "./WasmQuerier";
import { MessageDetail } from "./MessageDetail";

export class WasmTx {

    private _tx: CreateTxOptions
    private feeDenom?: string

    constructor(
        private readonly querier: WasmQuerier,
        public readonly sender: string,
        public readonly messages: MessageDetail[],
        public readonly memo?: string,
    ) { }

    get tax() {
        return this.querier.getTax()
    }

    public get tx() {
        return this._tx
    }

    async init() {
        this._tx = await this.querier.estimateFee(
            this.sender,
            this.messages,
            this.memo,
            this.feeDenom ? [this.feeDenom] : undefined
        )
    }

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

    async getTxOptions(feeDenom: string): Promise<CreateTxOptions> {
        this.feeDenom = feeDenom
        await this.init()

        const coins = this.tx.fee.amount.add(this.getTotalTax())
        const fee = new Fee(this.tx.fee.gas_limit, coins.map(e => new Coin(e.denom, Number(e.amount).toFixed(0))))
        const tx = {
            ...this.tx,
            fee
        }
        return tx;
    }
}
