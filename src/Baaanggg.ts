import { AuthAPI } from "./api/AuthAPI"
import { TokenResponse } from "./dto/response/TokenResponse"
import { ErrorResponse } from "./dto/response/ErrorResponse"
import { BASE_URL } from "./Constant"
import { AdminAPI } from "./api/AdminAPI"
import { MeAPI } from "./api/MeAPI"
import { ChainAPI } from "./api/ChainAPI"
import { APIRequester } from "./APIRequester"
import { CoinAPI } from "./api/CoinAPI"

export class Baaanggg {
    token?: TokenResponse
    private requester = new APIRequester(BASE_URL, {
        getToken: () => this.getToken(),
        onAuthenticated: (token) => this.onAuthenticated(token),
        onAuthenticationError: () => { this.settings?.onAuthenticationError?.() }
    })

    constructor(private settings?: BaaangggSettings) { }

    auth = new AuthAPI(this.requester, token => this.onAuthenticated(token))
    admin = new AdminAPI(this.requester)
    me = new MeAPI(this.requester)
    chain = new ChainAPI(this.requester)
    coin = new CoinAPI(this.requester)

    private onAuthenticated(token: TokenResponse) {
        this.token = token
        if (this.settings?.useLocalStorage) localStorage.setItem('token', JSON.stringify(token))
    }

    private getToken() {
        let token = this.token
        if (this.settings?.useLocalStorage) {
            const tokenJson = localStorage.getItem('token')
            if (tokenJson != null) token = JSON.parse(tokenJson)
        }
        return token
    }
}

export class ApiError extends Error {
    constructor(response: ErrorResponse) {
        super(response.message)
    }
}

export class BaaangggSettings {
    useLocalStorage: boolean = false
    onAuthenticationError?: () => void
}