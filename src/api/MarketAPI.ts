import { LCDClient, MsgExecuteContract } from "@terra-money/terra.js";
import { CreateCollectionRequest } from "../dto/request/CreateCollectionRequest";
import { ContractRequest } from "../dto/request/ContractRequest";
import { MessageDetail } from "../MessageDetail";
import { BaseAPI, BaseQueryCommand } from "./BaseAPI";

export class MarketAPI extends BaseAPI<ExecuteCommand, QueryCommand> {
    protected get executeType(): new () => ExecuteCommand {
        return ExecuteCommand
    }
    protected get queryType(): new (lcd: LCDClient) => QueryCommand {
        return QueryCommand;
    }
}

class ExecuteCommand {
    createCollection({ contract, sender, data }: ContractRequest<CreateCollectionRequest>): MessageDetail {
        return {
            label: `Create collection '${data.name}'`,
            msg: new MsgExecuteContract(sender, contract, { create_collection: data }),
        }
    }
}

class QueryCommand extends BaseQueryCommand {

}