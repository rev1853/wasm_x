import { ContractRequest } from "./ContractRequest";
import { ShareRequest } from "./ShareRequest";

export interface CreateCollectionRequest {
    name: string,
    symbol: string,
    owner: string,
    owner_pubkey: string
    tx_shares: ShareRequest[],
    mint_shares: ShareRequest[],
}