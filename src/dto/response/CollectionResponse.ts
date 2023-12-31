export class CollectionResponse {
    id: string;
    name: string;
    symbol: string;
    description?: string;
    siteUrl?: string;
    discordUrl?: string;
    whitepaperUrl?: string;
    thumbUrl?: string;
    bannerUrl?: string;
    collectionContract: string;
    nftContract: string;
    ownerAddress: string;
    createdAt: Date;
    updatedAt: Date;
    chainId: string;
}