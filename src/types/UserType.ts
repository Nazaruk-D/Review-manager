import { RoleType } from './RoleType';

export type UserType = {
    id: string | number;
    email: string;
    firstName: string;
    lastName: string;
    role: RoleType;
    avatar: string;
    isBlocked: 0 | 1;
    createdAt: string;
    updatedAt: string;
};
