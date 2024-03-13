import { AssetResponse } from "./AssetResponse"

export class BidByNftResponse {
    bids: BidItem[]
}

export class BidItem {
    token_id: string
    bid_price: AssetResponse
    buyer: string
}