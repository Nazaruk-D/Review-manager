export type FacebookResponse = {
    accessToken: string;
    data_access_expiration_time: number;
    email: string;
    expiresIn: number;
    graphDomain: string;
    id: string;
    name: string;
    picture: {
        data: { height: number; is_silhouette: boolean; url: string; width: number };
    };
    signedRequest: string;
    userID: string;
};
