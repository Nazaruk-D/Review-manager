import { ReviewType } from './ReviewType';

export type CreateReviewType = ReviewType & { userId: string; author_name: string; uploadImage?: File | null };
