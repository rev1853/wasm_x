import { LCDClient } from "@terra-money/feather.js";

export abstract class BaseAPI<E, Q extends BaseQueryCommand> {
    private _execute: E
    private _query: Q

    constructor(private lcd: LCDClient) { }

    protected abstract get executeType(): { new(): E; }
    protected abstract get queryType(): { new(lcd: LCDClient): Q; }

    get execute() {
        this._execute = this._execute || this.commandActivator(this.executeType)
        return this._execute
    }

    get query() {
        this._query = this._query || this.commandActivator(this.queryType)
        return this._query
    }

    private commandActivator<T>(Type: { new(lcd: LCDClient): T; }): T {
        return new Type(this.lcd);
    }
}

export class BaseQueryCommand {
    constructor(protected lcd: LCDClient) { }
}