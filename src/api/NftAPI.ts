import { LCDClient, MsgExecuteContract } from "@terra-money/terra.js";
import { ContractRequest } from "../dto/request";
import { SetLabelsRequest } from "../dto/request/SetLabelsRequest";
import { MessageDetail } from "../MessageDetail";
import { BaseAPI, BaseQueryCommand } from "./BaseAPI";
import { ApproveRequest } from "../dto/request/ApproveRequest";
import { RevokeRequest } from "../dto/request/RevokeRequest";

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

    approve({ contract, data, sender }: ContractRequest<ApproveRequest>): MessageDetail {
        return {
            label: "Set approval",
            msg: new MsgExecuteContract(sender, contract, {
                approve: data
            })
        }
    }

    revoke({ contract, data, sender }: ContractRequest<RevokeRequest>): MessageDetail {
        return {
            label: "Revoke an approval",
            msg: new MsgExecuteContract(sender, contract, {
                revoke: data
            })
        }
    }
}

class QueryCommand extends BaseQueryCommand {

}