import { LCDClient, MsgExecuteContract } from "@terra-money/feather.js";
import { MessageDetail } from "../MessageDetail";
import { ContractRequest } from "../dto/request";
import { SetTxSharesRequest } from "../dto/request/SetTxSharesRequest";
import { SetMintShares } from "../dto/request/SetMintShares";
import { BaseAPI, BaseQueryCommand } from "./BaseAPI";

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
}

class QueryCommand extends BaseQueryCommand {
}