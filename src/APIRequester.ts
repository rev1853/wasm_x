import Axios, { AxiosInstance } from "axios"
import { ApiError } from "./Baaanggg"
import { TokenResponse } from "./dto/response"

export class APIRequester {
    axios: AxiosInstance

    constructor(baseURL: string, settings: APIRequesterSettings) {
        this.axios = Axios.create({
            baseURL: baseURL,
        })

        this.axios.interceptors.request.use(config => {
            const token = settings.getToken()
            if (token) config.headers.Authorization = "Bearer " + token.accessToken

            return config
        }, error => Promise.reject(error))
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        try {
            const res = await this.axios.post(endpoint, data)
            return res.data
        } catch (e: any) {
            if ('response' in e && 'data' in e.response) throw new ApiError(e.response.data)
            throw e
        }
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        try {
            const res = await this.axios.put(endpoint, data)
            return res.data
        } catch (e: any) {
            if ('response' in e && 'data' in e.response) throw new ApiError(e.response.data)
            throw e
        }
    }

    async delete<T>(endpoint: string): Promise<T> {
        try {
            const res = await this.axios.delete(endpoint)
            return res.data
        } catch (e: any) {
            if ('response' in e && 'data' in e.response) throw new ApiError(e.response.data)
            throw e
        }
    }

    async get<T>(endpoint: string): Promise<T> {
        try {
            const res = await this.axios.get(endpoint)
            return res.data
        } catch (e: any) {
            if ('response' in e && 'data' in e.response) throw new ApiError(e.response.data)
            throw e
        }
    }
}

export interface APIRequesterSettings {
    getToken: () => TokenResponse | undefined
}