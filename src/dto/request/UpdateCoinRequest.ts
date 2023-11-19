export interface UpdateCoinRequest {
    name: string;
    denom: string;
    isCw20: boolean;
    cw20Address?: string;
    icon?: string;
    chainId: string;
}