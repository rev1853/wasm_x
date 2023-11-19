import Axios, { AxiosError, AxiosInstance } from "axios"
import { ApiError } from "./Baaanggg"
import { TokenResponse } from "./dto/response"

export class APIRequester {
    axios: AxiosInstance

    constructor(baseURL: string, private settings: APIRequesterSettings) {
        this.axios = Axios.create({
            baseURL: baseURL,
        })

        this.axios.interceptors.request.use(config => {
            const token = settings.getToken()
            if (token) config.headers.Authorization = "Bearer " + token.accessToken

            return config
        }, error => Promise.reject(error))

        this.axios.interceptors.response.use(
            res => res,
            async (error: AxiosError) => {
                const request = error.config as any
                const paths = error.config!.url!.split('/')
                const lastPath = paths[paths.length - 1]


                if (error.response?.status === 401 && !request._retry && lastPath != "refresh") {
                    const token = settings.getToken()
                    if (!token) return Promise.reject(error);
                    request._retry = true;

                    let newToken;
                    const count = 0;
                    while (count < 3) {
                        try {
                            newToken = await this.refreshToken(token)
                        } catch { }
                    }

                    if (newToken) {
                        settings.onAuthenticated(newToken)
                        request.headers.Authorization = `Bearer ${newToken.accessToken}`;
                        return this.axios(request);
                    }
                }

                return Promise.reject(error);
            }
        )
    }

    async refreshToken(token: TokenResponse): Promise<TokenResponse | undefined> {
        try {
            const response = await this.post<TokenResponse>('/auth/refresh', {
                refreshToken: token.refreshToken,
            });
            return response;
        } catch (error) {
            return undefined;
        }
    };

    async post<T>(endpoint: string, data?: any): Promise<T> {
        try {
            const res = await this.axios.post(endpoint, data)
            return res.data
        } catch (e: any) {
            throw this.handleError(e)
        }
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        try {
            const res = await this.axios.put(endpoint, data)
            return res.data
        } catch (e: any) {
            throw this.handleError(e)
        }
    }

    async delete<T>(endpoint: string): Promise<T> {
        try {
            const res = await this.axios.delete(endpoint)
            return res.data
        } catch (e: any) {
            throw this.handleError(e)
        }
    }

    async get<T>(endpoint: string): Promise<T> {
        try {
            const res = await this.axios.get(endpoint)
            return res.data
        } catch (e: any) {
            throw this.handleError(e)
        }
    }

    handleError(e: AxiosError) {
        if (e instanceof AxiosError) {
            if (e.status === 401) this.settings.onAuthenticationError()
            if (e.response && e.response.data) throw new ApiError(e.response.data as any)
        }
        throw e
    }
}

export interface APIRequesterSettings {
    getToken: () => TokenResponse | undefined,
    onAuthenticated: (token: TokenResponse) => void,
    onAuthenticationError: () => void
}