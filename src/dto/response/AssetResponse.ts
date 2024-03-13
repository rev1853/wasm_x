export class AssetResponse {
    coin?: {
        denom: string,
        amount: string
    }
    token?: {
        address: string,
        amount: string
    }
}