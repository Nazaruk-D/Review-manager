import { ReviewType } from './ReviewType';

export type SendReviewType = ReviewType & {
    author_id: string;
    reviewId: string;
    author_name: string;
    url: string;
    uploadImage?: File[] | null;
};
