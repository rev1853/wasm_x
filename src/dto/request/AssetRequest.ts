export class AssetRequest {
    coin?: {
        denom: string,
        amount: string
    }
    token?: {
        address: string,
        amount: string
    }
}