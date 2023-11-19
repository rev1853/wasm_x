import { UpdateChainRequest } from "../dto/request/UpdateChainRequest";
import { ChainResponse } from "../dto/response/ChainResponse";
import { BaseAPI } from "./BaseAPI";

export class ChainAPI extends BaseAPI {
    path: string = 'chain'


    async all() {
        return this.requester.get<ChainResponse[]>(this.getEndpoint())
    }

    async chainId(chainId: string) {
        return this.requester.get<ChainResponse>(this.getEndpoint(chainId))
    }

    async update(id: string, data: UpdateChainRequest) {
        return this.requester.put<ChainResponse>(this.getEndpoint(id), data)
    }
}