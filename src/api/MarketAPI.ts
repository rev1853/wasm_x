import { MsgExecuteContract } from "@terra-money/feather.js";
import { CreateCollectionRequest } from "../dto/request/CreateCollectionRequest";
import { ContractRequest } from "../dto/request/ContractRequest";
import { WasmTx } from "../WasmTx";
import { WasmQuerier } from "../WasmQuerier";
import { MessageDetail } from "../MessageDetail";

export class MarketAPI {
    createCollection({ contract, sender, data }: ContractRequest<CreateCollectionRequest>): MessageDetail {
        return {
            label: `Create collection '${data.name}'`,
            msg: new MsgExecuteContract(sender, contract, { create_collection: data }),
        }
    }
}