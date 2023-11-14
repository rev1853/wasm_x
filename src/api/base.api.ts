import { ApiRequester } from "../baaanggg";

export abstract class BaseApi {
    abstract path: string

    constructor(protected requester: ApiRequester) { }

    getEndpoint(endpoint: string): string { return this.path + '/' + endpoint }
}