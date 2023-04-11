import { LoginType } from './LoginType';

export type RegistrationType = LoginType & {
    firstName: string;
    lastName: string;
};
