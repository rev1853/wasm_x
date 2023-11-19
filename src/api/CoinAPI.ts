import { CreateCoinRequest } from "../dto/request/CreateCoinRequest";
import { UpdateCoinRequest } from "../dto/request/UpdateCoinRequest";
import { CoinResponse } from "../dto/response/CoinResponse";
import { BaseAPI } from "./BaseAPI";

export class CoinAPI extends BaseAPI {
    path: string = 'coin'

    async byChain(chainId: string) {
        return this.requester.get<CoinResponse[]>(this.getEndpoint('chain', chainId))
    }

    async byDenom(denom: string) {
        return this.requester.get<CoinResponse>(this.getEndpoint('denom', denom))
    }

    async create(data: CreateCoinRequest) {
        return this.requester.post<CoinResponse>(this.getEndpoint(), data)
    }

    async update(id: string, data: UpdateCoinRequest) {
        return this.requester.put<CoinResponse>(this.getEndpoint(id), data)
    }

    async delete(id: string) {
        return this.requester.delete<CoinResponse>(id)
    }
}