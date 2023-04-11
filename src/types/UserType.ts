import { RoleType } from './RoleType';

export type UserType = {
    id: string | number;
    email: string;
    firstName: string;
    lastLame: string;
    role: RoleType;
    avatar: string;
    isBlocked: 0 | 1;
    createdAt: string;
    updatedAt: string;
};
