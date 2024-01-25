import { MsgExecuteContract } from "@terra-money/feather.js";
import { CreateCollectionRequest } from "../dto/request/CreateCollectionRequest";
import { BaseAPI, BaseCommand } from "./BaseAPI";
import { ContractRequest } from "../dto/request/ContractRequest";
import { WasmTx } from "../WasmTx";
import { WasmQuerier } from "../WasmQuerier";

export class MarketAPI extends BaseAPI<ExecuteCommand, QueryCommand> {
    protected get executeType(): new (querier: WasmQuerier) => ExecuteCommand {
        return ExecuteCommand
    }

    protected get queryType(): new (querier: WasmQuerier) => QueryCommand {
        return QueryCommand
    }
}

class ExecuteCommand extends BaseCommand {
    createCollection(request: ContractRequest<CreateCollectionRequest>) {
        return new WasmTx(this.querier, request, (sender, contract, data) => {
            const messages = {}
            messages[`Create collection '${data.name}'`] = new MsgExecuteContract(sender, contract, { create_collection: data });

            return messages
        })
    }
}

class QueryCommand extends BaseCommand {

}