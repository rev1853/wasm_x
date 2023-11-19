export interface UserResponse {
    id: string;
    username: string;
    bio: string;
    email: string;
    twitterUrl: string;
    instagramUrl: string;
    discordUrl: string;
    whitepaperUrl: string;
    thumbUrl: string;
    bannerUrl: string;
    walletAddress: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}