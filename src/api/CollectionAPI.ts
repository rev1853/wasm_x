import { Coin, LCDClient, MsgExecuteContract } from "@terra-money/feather.js";
import { MessageDetail } from "../MessageDetail";
import { AssetRequest, ContractRequest } from "../dto/request";
import { SetTxSharesRequest } from "../dto/request/SetTxSharesRequest";
import { SetMintShares } from "../dto/request/SetMintShares";
import { BaseAPI, BaseQueryCommand } from "./BaseAPI";
import { QueryRequest } from "../dto/request/QueryRequest";
import { GenerateVoucherRequest } from "../dto/request/GenerateVoucherRequest";
import { GenerateVoucherResponse } from "../dto/response/GenerateVoucherResponse";
import { MintRequest } from "../dto/request/MintRequest";

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
}

class QueryCommand extends BaseQueryCommand {
    async generateVoucher({ contract, data }: QueryRequest<GenerateVoucherRequest>) {
        return await this.lcd.wasm.contractQuery<GenerateVoucherResponse>(contract, { generate_voucher: data })
    }
}