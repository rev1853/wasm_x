import { MsgExecuteContract } from "@terra-money/feather.js";

export interface MessageDetail {
    label: string,
    msg: MsgExecuteContract
}