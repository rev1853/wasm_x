import { Coins, Fee, Msg, Numeric } from "@terra-money/feather.js";

export interface TxRequest {
    chainID: string;
    msgs: Msg[];
    memo?: string;
    gasPrices?: Coins.Input;
    gasAdjustment?: Numeric.Input;
    feeDenoms?: string[];
    timeoutHeight?: number;
}