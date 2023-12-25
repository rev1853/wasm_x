export interface ChainResponse {
    id: string
    name: string
    prefix: string
    imageUrl: string
    chainId: string
    lcdUrl: string
    websocketUrl: string
    isClassic: boolean
    baseAsset: string
    gasAdjustment: number
    gasPrices: string
    txExplorer: string
    tax: number
    addressExplorer: string
    marketContract: string
    createdAt: Date
    updatedAt: Date
}