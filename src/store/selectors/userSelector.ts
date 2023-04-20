import { AppRootStateType } from '../store';

export const selectorIsLogin = (state: AppRootStateType) => state.user.isLoggedIn;

export const selectorUserData = (state: AppRootStateType) => state.user.user;
export const selectorUserId = (state: AppRootStateType) => state.user.user?.id;
export const selectorUserName = (state: AppRootStateType) => state.user.user?.user_name;
