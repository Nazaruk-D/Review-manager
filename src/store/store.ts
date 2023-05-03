import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import adminReducer from './slices/adminSlice';
import userReducer from './slices/userSlice';
import reviewReducer from './slices/reviewSlice';
import sortReducer from './slices/sortSlice';
import { authAPI } from './api/authAPI';
import { reviewAPISlice } from './api/reviewAPISlice';
import { itemAPI } from './api/itemAPI';
import { userAPISlice } from './api/userAPISlice';

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    review: reviewReducer,
    sort: sortReducer,
    admin: adminReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [reviewAPISlice.reducerPath]: reviewAPISlice.reducer,
    [itemAPI.reducerPath]: itemAPI.reducer,
    [userAPISlice.reducerPath]: userAPISlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authAPI.middleware)
            .concat(reviewAPISlice.middleware)
            .concat(itemAPI.middleware)
            .concat(userAPISlice.middleware),
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
