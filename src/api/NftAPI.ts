import { MsgExecuteContract } from "@terra-money/feather.js";
import { ContractRequest } from "../dto/request";
import { SetLabelsRequest } from "../dto/request/SetLabelsRequest";
import { MessageDetail } from "../MessageDetail";

export class NftAPI {
    setLabels({ sender, contract, data }: ContractRequest<SetLabelsRequest>): MessageDetail {
        return {
            label: `Set Labels to '${data.name}'`,
            msg: new MsgExecuteContract(sender, contract, { set_labels: data })
        }
    }
}