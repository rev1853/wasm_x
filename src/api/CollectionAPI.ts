import { UpdateCollectionRequest } from "../dto/request/UpdateCollectionRequest";
import { CollectionResponse } from "../dto/response/CollectionResponse";
import { BaseAPI } from "./BaseAPI";

export class CollectionAPI extends BaseAPI {
    path: string = 'collection'

    async get(search?: string, chainId?: string) {
        return await this.requester.get<CollectionResponse[]>(this.getEndpoint(), { search, chainId })
    }

    async find(id: string) {
        return await this.requester.get<CollectionResponse>(this.getEndpoint(id))
    }

    async update(id: string, data: UpdateCollectionRequest) {
        return await this.requester.put<CollectionResponse>(this.getEndpoint(id), data)
    }
}