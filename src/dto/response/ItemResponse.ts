export class ItemResponse {
    id: string;
    image: string;
    name: string;
    description?: string;
    supply: number;
    backgroundColor?: string;
    animationUrl?: string;
    externalUrl?: string;
    tokenUri?: string;
    youtubeUrl?: string;
    imageData?: string;
    createdAt: Date;
    updatedAt: Date;
    collectionId: string;
}