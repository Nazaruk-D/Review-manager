export type ReviewType = {
    title: string;
    review_title: string;
    category: string;
    body: string;
    rating: number | null;
    tags?: string[];
    photo: string | null;
};
