import { AppRootStateType } from '../store';

export const userIdSelector = (state: AppRootStateType) => state.admin.user?.id;
export const userNameSelector = (state: AppRootStateType) => state.admin.user?.user_name;
export const userPhotoSelector = (state: AppRootStateType) => state.admin.user?.main_photo;
