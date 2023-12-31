import { ContractRequest } from "./ContractRequest";
import { ShareRequest } from "./ShareRequest";

export interface CreateCollectionRequest {
    name: string,
    symbol: string,
    owner: string,
    tx_shares: ShareRequest[],
    mint_shares: ShareRequest[],
}