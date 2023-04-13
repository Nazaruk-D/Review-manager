import { AppRootStateType } from '../store';

export const selectorInitialized = (state: AppRootStateType) => state.app.initialized;
