import { AssetRequest } from "../request"
import { AssetResponse } from "./AssetResponse"

export class SellInfoResponse {
    token_id: string
    prices: AssetResponse[]
    owner: string
    is_active: boolean
}