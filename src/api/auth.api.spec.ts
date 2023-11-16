import { BASE_URL } from "../constant"
import { ApiError, Baaanggg } from "../baaanggg"


describe('auth', () => {
    const client = new Baaanggg(BASE_URL);
    const auth = client.auth

    describe('sign-in', () => {
        it('success', async () => {
            const res = auth.signIn({
                walletAddress: "terra10jwx5kv59ytapg2v7t6wgvjpm0smyq3ezywx7j",
                signature: "CB8BpozZmyIe+9EabxBHVKzGnEZi2jgD0+ohmYxwXl9gjzw7cmCfap4hvu4L2hdOiZNOvumk7zpvCmPdraSQzQ==",
                publicKey: "AhOSFLfZgwp60gxMDaYbtedrfHpRYLUTZbVzvUE23NW5"
            })
            await expectAsync(res).toBeResolved()
        })

        it('failed', async () => {
            const res = auth.signIn({
                walletAddress: "terra10jwx5kv59ytapg2v7t6wgvjpm0smyq3ezywx7j",
                signature: "CB8BpozZmyIe+9EabxBHVKzGnEZi2jgD0+ohmYxwXl9gjzw7cmCfap4hvu4L2hdOiZNOvumk7zpvCmPdraSQzQ==",
                publicKey: "wrong public key"
            })
            await expectAsync(res).toBeRejectedWithError(ApiError)
        })
    })

    describe('sign-in/admin', () => {
        it('success', async () => {
            const res = auth.signInAdmin({
                username: "revan",
                password: "revan1853"
            })
            await expectAsync(res).toBeResolved()
        })

        it('failed', async () => {
            const res = auth.signInAdmin({
                username: "revan",
                password: "wrong"
            })
            await expectAsync(res).toBeRejectedWithError(ApiError)
        })
    })

    describe('refresh', () => {
        it('success', async () => {
            const token = await auth.signIn({
                walletAddress: "terra10jwx5kv59ytapg2v7t6wgvjpm0smyq3ezywx7j",
                signature: "CB8BpozZmyIe+9EabxBHVKzGnEZi2jgD0+ohmYxwXl9gjzw7cmCfap4hvu4L2hdOiZNOvumk7zpvCmPdraSQzQ==",
                publicKey: "AhOSFLfZgwp60gxMDaYbtedrfHpRYLUTZbVzvUE23NW5"
            })
            const res = auth.refresh({ refreshToken: token.refreshToken })
            await expectAsync(res).toBeResolved()
        })

        it('failed', async () => {
            const res = auth.refresh({ refreshToken: "wrong token" })
            await expectAsync(res).toBeRejectedWithError(ApiError)
        })
    })

    describe('check', () => {
        it('success', async () => {
            await auth.signIn({
                walletAddress: "terra10jwx5kv59ytapg2v7t6wgvjpm0smyq3ezywx7j",
                signature: "CB8BpozZmyIe+9EabxBHVKzGnEZi2jgD0+ohmYxwXl9gjzw7cmCfap4hvu4L2hdOiZNOvumk7zpvCmPdraSQzQ==",
                publicKey: "AhOSFLfZgwp60gxMDaYbtedrfHpRYLUTZbVzvUE23NW5"
            })
            const res = auth.check()
            await expectAsync(res).toBeResolved()
        })

        it('failed', async () => {
            const res = auth.check()
            await expectAsync(res).toBeRejectedWithError(ApiError)
        })
    })
})