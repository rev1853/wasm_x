import { AdminResponse } from "../dto/response/AdminResponse";
import { BaseAPI } from "./BaseAPI";

export class AdminAPI extends BaseAPI {
    path: string = "admin"

    async all() {
        return await this.requester.get<AdminResponse[]>(this.getEndpoint())
    }
}