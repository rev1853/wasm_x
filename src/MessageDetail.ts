import { MsgExecuteContract } from "@terra-money/terra.js";

export interface MessageDetail {
    label: string,
    msg: MsgExecuteContract
}