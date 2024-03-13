import { AssetRequest } from "./AssetRequest"

export class SellRequest {
    token_id: string
    prices: AssetRequest[]
}