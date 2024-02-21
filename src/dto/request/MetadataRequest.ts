import { TraitRequest } from "./TraitRequest"

export class MetadataRequest {
    image?: string
    external_url?: string
    description?: string
    name?: string
    attributes?: TraitRequest[]
    token_uri?: string
    background_color?: string
    animation_url?: string
    youtube_url?: string
    image_data?: string
    identifier?: string
    supply?: number
}