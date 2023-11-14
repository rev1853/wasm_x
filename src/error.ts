import { ErrorResponse } from "./dto/response/error.response";

export class ApiError extends Error {
    constructor(public data?: ErrorResponse) {
        super()
    }
}