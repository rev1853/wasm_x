import { AssetRequest } from "./AssetRequest";
import { MetadataRequest } from "./MetadataRequest";

export class VoucherRequest {
    metadata: MetadataRequest
    prices: AssetRequest[]
}