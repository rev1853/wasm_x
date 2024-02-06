import { MsgExecuteContract } from "@terra-money/feather.js";
import { WasmQuerier } from "../WasmQuerier";
import { WasmTx } from "../WasmTx";
import { ContractRequest, CreateCollectionRequest } from "../dto/request";
import { SetLabelsRequest } from "../dto/request/SetLabelsRequest";
import { BaseAPI, BaseCommand } from "./BaseAPI";

export class NftAPI extends BaseAPI<ExecuteCommand, QueryCommand> {
    protected get executeType(): new (querier: WasmQuerier) => ExecuteCommand {
        return ExecuteCommand
    }
    protected get queryType(): new (querier: WasmQuerier) => QueryCommand {
        return QueryCommand
    }
}

class ExecuteCommand extends BaseCommand {
    setLabels(request: ContractRequest<SetLabelsRequest>) {
        return new WasmTx(this.querier, request, (sender, contract, data) => {
            const messages = {}
            messages[`Set name to '${data.name}'`] = new MsgExecuteContract(sender, contract, { set_labels: data });

            return messages
        })
    }
}

class QueryCommand extends BaseCommand {

}