import { Coin, LCDClient, MsgExecuteContract } from "@terra-money/terra.js";
import { MessageDetail } from "../MessageDetail";
import { AssetRequest, ContractRequest } from "../dto/request";
import { SetTxSharesRequest } from "../dto/request/SetTxSharesRequest";
import { SetMintShares } from "../dto/request/SetMintShares";
import { BaseAPI, BaseQueryCommand } from "./BaseAPI";
import { QueryRequest } from "../dto/request/QueryRequest";
import { GenerateVoucherRequest } from "../dto/request/GenerateVoucherRequest";
import { GenerateVoucherResponse } from "../dto/response/GenerateVoucherResponse";
import { MintRequest } from "../dto/request/MintRequest";
import { SellRequest } from "../dto/request/SellRequest";
import { SellInfoRequest } from "../dto/request/SellInfoRequest";
import { SellInfoResponse } from "../dto/response/SellInfoResponse";
import { CancelSellRequest } from "../dto/request/CancelSellRequest";
import { BuyRequest } from "../dto/request/BuyRequest";
import { BidRequest } from "../dto/request/BidRequest";
import { BidByBuyerRequest } from "../dto/request/BidByBuyerRequest";
import { BidByBuyerResponse } from "../dto/response/BidByBuyerResponse";
import { WithdrawBidRequest } from "../dto/request/WithdrawBidRequest";
import { BidByNftRequest } from "../dto/request/BidByNftRequest";
import { BidByNftResponse } from "../dto/response/BidByNftResponse";
import { AcceptBidRequest } from "../dto/request/AcceptBidRequest";

export class CollectionAPI extends BaseAPI<ExecuteCommand, QueryCommand> {
    protected get executeType(): new () => ExecuteCommand {
        return ExecuteCommand
    }
    protected get queryType(): new (lcd: LCDClient) => QueryCommand {
        return QueryCommand;
    }

}

class ExecuteCommand {
    setTxShares({ contract, data, sender }: ContractRequest<SetTxSharesRequest>): MessageDetail {
        return {
            label: "Set transaction shares",
            msg: new MsgExecuteContract(sender, contract, {
                set_tx_shares: data
            })
        }
    }

    setMintShares({ contract, data, sender }: ContractRequest<SetMintShares>): MessageDetail {
        return {
            label: "Set mint shares",
            msg: new MsgExecuteContract(sender, contract, {
                set_mint_shares: data
            })
        }
    }

    mint({ contract, data, sender }: ContractRequest<MintRequest>, asset: AssetRequest) {
        const mintMsg = {
            mint: data
        };
        let msg: MsgExecuteContract;

        if (asset.coin) {
            msg = new MsgExecuteContract(
                sender,
                contract,
                mintMsg,
                [new Coin(asset.coin.denom, asset.coin.amount)]
            )
        }

        if (asset.token) {
            msg = new MsgExecuteContract(sender, asset.token.address, {
                send: {
                    msg: Buffer.from(JSON.stringify(mintMsg)).toString("base64"),
                    amount: asset.token.amount,
                    contract: contract
                }
            })
        }

        return {
            label: "Mint NFT",
            msg
        }
    }

    sell({ contract, data, sender }: ContractRequest<SellRequest>): MessageDetail {
        return {
            label: "Sell NFT",
            msg: new MsgExecuteContract(sender, contract, {
                sell: data
            })
        }
    }

    cancelSell({ contract, data, sender }: ContractRequest<CancelSellRequest>): MessageDetail {
        return {
            label: "Cancel Sell NFT",
            msg: new MsgExecuteContract(sender, contract, {
                cancel_sell: data
            })
        }
    }

    buy({ contract, data, sender }: ContractRequest<BuyRequest>, asset: AssetRequest): MessageDetail {
        const buyMsg = {
            buy: data
        };
        let msg: MsgExecuteContract;

        if (asset.coin) {
            msg = new MsgExecuteContract(
                sender,
                contract,
                buyMsg,
                [new Coin(asset.coin.denom, asset.coin.amount)]
            )
        }

        if (asset.token) {
            msg = new MsgExecuteContract(sender, asset.token.address, {
                send: {
                    msg: Buffer.from(JSON.stringify(buyMsg)).toString("base64"),
                    amount: asset.token.amount,
                    contract: contract
                }
            })
        }

        return {
            label: "Buy NFT",
            msg
        }
    }

    bid({ contract, data, sender }: ContractRequest<BidRequest>, asset: AssetRequest): MessageDetail {
        const bidMsg = {
            bid: data
        };
        let msg: MsgExecuteContract;

        if (asset.coin) {
            msg = new MsgExecuteContract(
                sender,
                contract,
                bidMsg,
                [new Coin(asset.coin.denom, asset.coin.amount)]
            )
        }

        if (asset.token) {
            msg = new MsgExecuteContract(sender, asset.token.address, {
                send: {
                    msg: Buffer.from(JSON.stringify(bidMsg)).toString("base64"),
                    amount: asset.token.amount,
                    contract: contract
                }
            })
        }

        return {
            label: "Bid NFT",
            msg
        }
    }

    withdrawBid({ contract, data, sender }: ContractRequest<WithdrawBidRequest>): MessageDetail {
        return {
            label: "Withdraw bid NFT",
            msg: new MsgExecuteContract(sender, contract, {
                withdraw_bid: data
            })
        }
    }

    acceptBid({ contract, data, sender }: ContractRequest<AcceptBidRequest>): MessageDetail {
        return {
            label: "Accept bid NFT",
            msg: new MsgExecuteContract(sender, contract, {
                accept_bid: data
            })
        }
    }
}

class QueryCommand extends BaseQueryCommand {
    async generateVoucher({ contract, data }: QueryRequest<GenerateVoucherRequest>) {
        return await this.lcd.wasm.contractQuery<GenerateVoucherResponse>(contract, { generate_voucher: data })
    }

    async sellInfo({ contract, data }: QueryRequest<SellInfoRequest>) {
        return await this.lcd.wasm.contractQuery<SellInfoResponse>(contract, { sell_info: data })
    }

    async bidByBuyer({ contract, data }: QueryRequest<BidByBuyerRequest>) {
        return await this.lcd.wasm.contractQuery<BidByBuyerResponse>(contract, { bid_by_buyer: data })
    }

    async bidByNft({ contract, data }: QueryRequest<BidByNftRequest>) {
        return await this.lcd.wasm.contractQuery<BidByNftResponse>(contract, { bid_by_nft: data })
    }
}