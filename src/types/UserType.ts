import { RoleType } from './RoleType';

export type UserType = {
    id: string;
    email: string;
    user_name: string;
    small_photo: string;
    main_photo: string;
    role: RoleType;
    createdAt?: string;
    updatedAt?: string;
};
