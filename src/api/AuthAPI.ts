import { APIRequester } from "../APIRequester";
import { AdminCredentialRequest } from "../dto/request/AdminCredentialRequest";
import { CredentialRequest } from "../dto/request/CredentialRequest";
import { RefreshRequest } from "../dto/request/RefreshRequest";
import { TokenResponse } from "../dto/response/TokenResponse";
import { UserResponse } from "../dto/response/UserResponse";
import { BaseAPI } from "./BaseAPI";

export class AuthAPI extends BaseAPI {
    path = 'auth'

    constructor(requester: APIRequester, private onAuthenticated: (token: TokenResponse) => void) {
        super(requester)
    }

    async signIn(body: CredentialRequest) {
        const token = await this.requester.post<TokenResponse>(this.getEndpoint('sign-in'), body)
        this.onAuthenticated(token)
        return token
    }

    async signInAdmin(body: AdminCredentialRequest) {
        const token = await this.requester.post<TokenResponse>(this.getEndpoint('sign-in', 'admin'), body)
        this.onAuthenticated(token)
        return token
    }

    async refresh(body: RefreshRequest) {
        const token = await this.requester.post<TokenResponse>(this.getEndpoint("refresh"), body)
        this.onAuthenticated(token)
        return token
    }

    async check() {
        return this.requester.get<UserResponse>(this.getEndpoint("check"))
    }
}