import Axios, { AxiosInstance } from "axios"
import { AuthApi } from "./api/auth.api"
import { TokenResponse } from "./dto/response/token.response"
import { ApiError } from "./error"

export class Baaanggg {
    token?: TokenResponse
    private requester = new ApiRequester(this.baseURL, {
        getToken: () => this.getToken()
    })

    auth = new AuthApi(this.requester, token => this.onAuthenticated(token))

    constructor(private baseURL: string) { }

    private onAuthenticated(token: TokenResponse) {
        this.token = token
    }

    private getToken() {
        return this.token
    }
}

export class ApiRequester {
    axios: AxiosInstance

    constructor(baseURL: string, settings: ApiRequesterSettings) {
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

interface ApiRequesterSettings {
    getToken: () => TokenResponse | undefined
}