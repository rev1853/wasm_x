import { AssetRequest } from "./AssetRequest"
import { MetadataRequest } from "./MetadataRequest"

export class MintRequest {
    owner: string
    extension: MetadataRequest
    prices: AssetRequest[]
    amount: number
    voucher: string
}