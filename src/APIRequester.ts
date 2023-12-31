import axios, { Axios, AxiosError, AxiosInstance } from "axios"
import { ApiError } from "./Baaanggg"
import { TokenResponse } from "./dto/response"

export class APIRequester {
    private _axios: AxiosInstance

    constructor(baseURL: string, private settings: APIRequesterSettings) {
        this._axios = axios.create({
            baseURL: baseURL,
        })

        this._axios.interceptors.request.use(config => {
            const token = settings.getToken()
            if (token) config.headers.Authorization = "Bearer " + token.accessToken

            return config
        }, error => Promise.reject(error))

        this._axios.interceptors.response.use(
            res => res,
            async (error: AxiosError) => {
                const request = error.config as any
                const authPaths = [
                    'auth/sign-in',
                    'auth/refresh',
                    'auth/sign-in/admin'
                ]


                if (error.response?.status === 401 && !request._retry && !authPaths.includes(error.config.url)) {
                    request._retry = true;

                    const token = settings.getToken()
                    if (token) {
                        let newToken: TokenResponse = undefined;
                        for (let i = 0; i < 3; i++) {
                            try {
                                newToken = await this.refreshToken(token)
                                if (newToken) break
                            } catch { }
                        }

                        if (newToken) {
                            settings.onAuthenticated(newToken)
                            return this._axios(request);
                        } else {
                            try {
                                await this.settings.requestAuthCallback()
                                return await this._axios(request)
                            } catch { }
                        }
                    } else {
                        try {
                            await this.settings.requestAuthCallback()
                            return await this._axios(request)
                        } catch { }
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
            const res = await this._axios.post(endpoint, data)
            return res.data
        } catch (e: any) {
            throw this.handleError(e)
        }
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        try {
            const res = await this._axios.put(endpoint, data)
            return res.data
        } catch (e: any) {
            throw this.handleError(e)
        }
    }

    async delete<T>(endpoint: string): Promise<T> {
        try {
            const res = await this._axios.delete(endpoint)
            return res.data
        } catch (e: any) {
            throw this.handleError(e)
        }
    }

    async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
        try {
            const res = await this._axios.get(endpoint, { params: params })
            return res.data
        } catch (e: any) {
            throw this.handleError(e)
        }
    }

    handleError(e: AxiosError) {
        if (e.response?.data) throw new ApiError(e.response.data as any)
    }
}

export interface APIRequesterSettings {
    getToken: () => TokenResponse | undefined,
    onAuthenticated: (token: TokenResponse) => void,
    requestAuthCallback: () => Promise<void>
}