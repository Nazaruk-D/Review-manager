import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import userReducer from './slices/userSlice';
import reviewReducer from './slices/reviewSlice';
import { authAPI } from './api/authAPI';
import { reviewAPISlice } from './api/reviewAPISlice';
import { commentAPI } from './api/commentAPI';
import { userAPISlice } from './api/userAPISlice';

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    review: reviewReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [reviewAPISlice.reducerPath]: reviewAPISlice.reducer,
    [commentAPI.reducerPath]: commentAPI.reducer,
    [userAPISlice.reducerPath]: userAPISlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authAPI.middleware)
            .concat(reviewAPISlice.middleware)
            .concat(commentAPI.middleware)
            .concat(userAPISlice.middleware),
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
