export interface ContractRequest<T> {
    sender: string
    contract: string
    data: T
}