import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import userReducer from './slices/userSlice';
import { authAPI } from './api/authAPI';
import { reviewAPI } from './api/reviewAPI';
import { commentAPI } from './api/commentAPI';

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [reviewAPI.reducerPath]: reviewAPI.reducer,
    [commentAPI.reducerPath]: commentAPI.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authAPI.middleware).concat(reviewAPI.middleware).concat(commentAPI.middleware),
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
