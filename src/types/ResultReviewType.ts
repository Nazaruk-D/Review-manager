import { ReviewType } from './ReviewType';

export type ResultReviewType = ReviewType & {
    id: string;
    updated_at: string;
    created_at: string;
    author_id: string;
    author_name: string;
    author_avatar: string;
    avg_rating: number;
    authorLikes: number;
    fts: string[];
};
