import { Coin, Msg, MsgExecuteContract } from "@terra-money/feather.js";
import { CreateCollectionRequest } from "../dto/request/CreateCollectionRequest";
import { BaseAPI } from "./BaseAPI";
import { ContractRequest } from "../dto/request/ContractRequest";
import { WasmTx } from "../WasmTx";

export class MarketAPI extends BaseAPI {

    createCollection(request: ContractRequest<CreateCollectionRequest>) {
        return new WasmTx(this.chainId, this.querier, request, (sender, contract, data) => {
            const messages = {}
            messages[`Create collection '${data.name}'`] = new MsgExecuteContract(sender, contract, { create_collection: data });

            return messages
        })
    }
}