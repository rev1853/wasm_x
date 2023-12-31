import { WasmQuerier } from "../WasmQuerier";

export class BaseAPI {
    constructor(protected querier: WasmQuerier, protected chainId: string) { }
}