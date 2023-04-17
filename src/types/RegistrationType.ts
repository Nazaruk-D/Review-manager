import { LoginType } from './LoginType';

export type RegistrationType = LoginType & {
    userName: string;
};
