import { AppRootStateType } from '../store';

export const selectorInitialized = (state: AppRootStateType) => state.app.initialized;
export const selectorError = (state: AppRootStateType) => state.app.error;
export const selectorThemeApp = (state: AppRootStateType) => state.app.themeColor;
