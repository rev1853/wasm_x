import { APIRequester } from "../APIRequester";

export abstract class BaseAPI {
    abstract path: string

    constructor(protected requester: APIRequester) { }

    getEndpoint(...endpoints: string[]): string { return this.path + '/' + endpoints.join('/') }
}