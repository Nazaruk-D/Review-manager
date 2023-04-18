import { RoleType } from './RoleType';

export type UserType = {
    id: string;
    email: string;
    user_name: string;
    avatar: string;
    role: RoleType;
    createdAt?: string;
    updatedAt?: string;
};
