import { CreateCommentType } from './CreateCommentType';
import { UserType } from './UserType';

export type CommentType = CreateCommentType & {
    id: string;
    created_at: string;
    updated_at: string;
    image: string;
    users: UserType;
};
