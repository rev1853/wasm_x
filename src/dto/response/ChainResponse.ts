export interface ChainResponse {
    id: string;
    name: string;
    chainId: string;
    lcdUrl: string;
    isClassic: boolean;
    gasAdjustment: number;
    gasPrices: string;
    prefix: string;
    marketContract: string;
    createdAt: Date;
    updatedAt: Date;
}