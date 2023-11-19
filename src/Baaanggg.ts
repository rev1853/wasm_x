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
        getToken: () => this.getToken()
    })

    auth = new AuthAPI(this.requester, token => this.onAuthenticated(token))
    admin = new AdminAPI(this.requester)
    me = new MeAPI(this.requester)
    chain = new ChainAPI(this.requester)
    coin = new CoinAPI(this.requester)

    private onAuthenticated(token: TokenResponse) {
        this.token = token
    }

    private getToken() {
        return this.token
    }
}

export class ApiError extends Error {
    constructor(response: ErrorResponse) {
        super(response.message)
    }
}