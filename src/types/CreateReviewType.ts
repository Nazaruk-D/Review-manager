import { ReviewType } from './ReviewType';

export type CreateReviewType = ReviewType & { author_id: string; author_name: string };
