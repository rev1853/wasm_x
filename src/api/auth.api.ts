import { ApiRequester } from "../baaanggg";
import { AdminCredentialRequest } from "../dto/request/admin-credential.request";
import { CredentialRequest } from "../dto/request/credential.request";
import { RefreshRequest } from "../dto/request/refresh.request";
import { TokenResponse } from "../dto/response/token.response";
import { UserResponse } from "../dto/response/user.response";
import { BaseApi } from "./base.api";

export class AuthApi extends BaseApi {
    path = 'auth'

    constructor(requester: ApiRequester, private onAuthenticated: (token: TokenResponse) => void) {
        super(requester)
    }

    async signIn(body: CredentialRequest): Promise<TokenResponse> {
        const token = await this.requester.post<TokenResponse>(this.getEndpoint('sign-in'), body)
        this.onAuthenticated(token)
        return token
    }

    async signInAdmin(body: AdminCredentialRequest): Promise<TokenResponse> {
        const token = await this.requester.post<TokenResponse>(this.getEndpoint('sign-in/admin'), body)
        this.onAuthenticated(token)
        return token
    }

    async refresh(body: RefreshRequest): Promise<TokenResponse> {
        const token = await this.requester.post<TokenResponse>(this.getEndpoint("refresh"), body)
        this.onAuthenticated(token)
        return token
    }

    async check(): Promise<UserResponse> {
        return this.requester.get<UserResponse>(this.getEndpoint("check"))
    }
}