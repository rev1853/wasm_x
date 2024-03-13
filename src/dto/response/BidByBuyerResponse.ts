import { AssetResponse } from "./AssetResponse"

export class BidByBuyerResponse {
    bids: BidItem[]
}

export class BidItem {
    token_id: string
    bid_price: AssetResponse
}