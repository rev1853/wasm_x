import { AuthAPI } from "./api/AuthAPI"
import { TokenResponse } from "./dto/response/TokenResponse"
import { ErrorResponse } from "./dto/response/ErrorResponse"
import { BASE_URL } from "./Constant"
import { AdminAPI } from "./api/AdminAPI"
import { MeAPI } from "./api/MeAPI"
import { ChainAPI } from "./api/ChainAPI"
import { APIRequester } from "./APIRequester"
import { CoinAPI } from "./api/CoinAPI"
import { CollectionAPI } from "./api/CollectionAPI"
import { UserAPI } from "./api/UserAPI"
import { ItemAPI } from "./api/ItemAPI"

export class Baaanggg {
    token?: TokenResponse
    private requester = new APIRequester(BASE_URL, {
        getToken: () => this.getToken(),
        onAuthenticated: (token) => this.setToken(token),
        requestAuthCallback: async () => {
            if (this.settings.requestAuthCallback) {
                await this.settings.requestAuthCallback()
                return Promise.resolve()
            }
            return Promise.reject("No callback")
        }
    })

    constructor(private settings?: BaaangggSettings) { }

    auth = new AuthAPI(this.requester, token => this.setToken(token))
    admin = new AdminAPI(this.requester)
    me = new MeAPI(this.requester)
    chain = new ChainAPI(this.requester)
    coin = new CoinAPI(this.requester)
    collection = new CollectionAPI(this.requester)
    user = new UserAPI(this.requester)
    item = new ItemAPI(this.requester)

    setToken(token: TokenResponse) {
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
    requestAuthCallback?: () => Promise<void>
}