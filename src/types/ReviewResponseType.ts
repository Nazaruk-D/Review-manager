import { ReviewType } from './ReviewType';

export type ReviewResponseType = ReviewType & {
    id: string;
    updated_at: string;
    created_at: string;
    author_id: string;
    author_name: string;
    author_avatar: string;
};
