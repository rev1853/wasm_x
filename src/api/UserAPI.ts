import { UpdateUserRequest } from "../dto/request/UpdateUserRequest";
import { UserResponse } from "../dto/response";
import { CheckUsernameResponse } from "../dto/response/CheckUsernameResponse";
import { BaseAPI } from "./BaseAPI";

export class UserAPI extends BaseAPI {
    path: string = 'user'

    async get() {
        return await this.requester.get<UserResponse[]>(this.getEndpoint())
    }

    async find(id: string) {
        return await this.requester.get<UserResponse>(this.getEndpoint(id))
    }

    async checkUsername(username: string) {
        return await this.requester.get<CheckUsernameResponse>(this.getEndpoint('check-username', username))
    }

    async update(id: string, data: UpdateUserRequest) {
        return await this.requester.put<UserResponse>(this.getEndpoint(id), data)
    }
}