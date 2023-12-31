import { Coin, Coins, CreateTxOptions, Fee, Msg } from "@terra-money/feather.js";
import { ContractRequest } from "./dto/request/ContractRequest";
import { WasmQuerier } from "./WasmQuerier";
import * as lodash from 'lodash'

type MessageDetail = { [key: string]: Msg }
type RequestParser<T> = (sender: string, contract: string, data: T) => MessageDetail

export class WasmTx<T> {
    public readonly contract: string
    public readonly sender: string
    public readonly memo?: string
    private readonly data: T
    private txOptions?: CreateTxOptions

    constructor(private chainId: string, private querier: WasmQuerier, request: ContractRequest<T>, private readonly parseRequest: RequestParser<T>) {
        this.contract = request.contract
        this.sender = request.sender
        this.memo = request.memo
        this.data = request.data
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

    getTaxes(tax: number) {
        return this.getTotalAmount().mul(tax)
    }

    getMsgs(): Msg[] {
        return lodash.values(this.getMsgDetails())
    }

    getMsgDetails(): MessageDetail {
        return this.parseRequest(this.sender, this.contract, this.data)
    }

    async toTxOptions(): Promise<CreateTxOptions> {
        this.txOptions = {
            chainID: this.chainId,
            msgs: this.getMsgs(),
            memo: this.memo,
        }

        const fee = await this.querier.estimateFee(this.sender, this.txOptions)
        this.txOptions.fee = fee

        return this.txOptions
    }
}
