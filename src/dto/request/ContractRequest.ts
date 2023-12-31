export interface ContractRequest<T> {
    sender: string,
    contract: string
    memo?: string
    data: T,
}