export interface CoinResponse {
    id: string;
    name: string;
    denom: string;
    isCw20: boolean;
    cw20Address: string;
    icon: string;
    createdAt: Date;
    updatedAt: Date;
    chainId: string;
}