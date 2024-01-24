import { WasmQuerier } from "../WasmQuerier";

export abstract class BaseAPI<E, Q> {
    private _execute: E
    private _query: Q

    constructor(private querier: WasmQuerier) { }

    protected abstract get executeType(): { new(querier: WasmQuerier): E; }
    protected abstract get queryType(): { new(querier: WasmQuerier): Q; }

    get execute() {
        this._execute = this._execute || this.commandActivator(this.executeType)
        return this._execute
    }

    get query() {
        this._query = this._query || this.commandActivator(this.queryType)
        return this._query
    }

    private commandActivator<T>(type: { new(querier: WasmQuerier): T; }): T {
        return new type(this.querier);
    }
}

export class BaseCommand {
    constructor(protected querier: WasmQuerier) { }
}