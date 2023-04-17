import { RoleType } from './RoleType';

export type UserType = {
    id: string;
    email: string;
    userName: string;
    avatar: string;
    role: RoleType;
    createdAt?: string;
    updatedAt?: string;
};
