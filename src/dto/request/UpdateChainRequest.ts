export interface UpdateChainRequest {
    name: string
    lcdUrl: string
    isClassic: boolean
    gasAdjustment: number
    gasPrices: string
    prefix: string
    marketContract: string
}