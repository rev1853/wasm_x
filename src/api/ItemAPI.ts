import { ItemResponse } from "../dto/response/ItemResponse";
import { BaseAPI } from "./BaseAPI";

export class ItemAPI extends BaseAPI {
    path: string = 'item'

    async get(collectionId?: string, search?: string) {
        return await this.requester.get<ItemResponse[]>(this.getEndpoint(), { collectionId, search })
    }

    async find(id: string) {
        return await this.requester.get<ItemResponse>(this.getEndpoint(id))
    }
}