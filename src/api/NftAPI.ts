import { LCDClient, MsgExecuteContract } from "@terra-money/feather.js";
import { ContractRequest } from "../dto/request";
import { SetLabelsRequest } from "../dto/request/SetLabelsRequest";
import { MessageDetail } from "../MessageDetail";
import { BaseAPI, BaseQueryCommand } from "./BaseAPI";

export class NftAPI extends BaseAPI<ExecuteCommand, BaseQueryCommand> {
    protected get executeType(): new () => ExecuteCommand {
        return ExecuteCommand
    }

    protected get queryType(): new (lcd: LCDClient) => BaseQueryCommand {
        return QueryCommand
    }

}

class ExecuteCommand {
    setLabels({ sender, contract, data }: ContractRequest<SetLabelsRequest>): MessageDetail {
        return {
            label: `Set Labels to '${data.name}'`,
            msg: new MsgExecuteContract(sender, contract, { set_labels: data })
        }
    }
}

class QueryCommand extends BaseQueryCommand {

}