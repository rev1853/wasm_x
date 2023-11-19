import { UserResponse } from "../dto/response";
import { BaseAPI } from "./BaseAPI";

export class MeAPI extends BaseAPI {
    path: string = 'me'

    async get() {
        return await this.requester.get<UserResponse>(this.getEndpoint())
    }
}