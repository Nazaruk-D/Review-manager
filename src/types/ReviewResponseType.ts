import { ReviewType } from './ReviewType';

export type ReviewResponseType = ReviewType & { author_id: string; id: string };
