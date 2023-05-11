import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewResponseType } from '../../types/ReviewResponseType';

export type InitialStateType = {
    search: string | '';
    usersReview: ReviewResponseType[] | null;
    tags: string[] | null;
    productNames: string[] | null;
};

const initialState: InitialStateType = {
    search: '',
    usersReview: null,
    tags: null,
    productNames: null,
};

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setUsersReview(state, action: PayloadAction<ReviewResponseType[]>) {
            state.usersReview = action.payload;
        },
        setTags(state, action: PayloadAction<string[]>) {
            state.tags = action.payload;
        },
        setProductNames(state, action: PayloadAction<string[]>) {
            state.productNames = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
    },
});

export const { setUsersReview, setTags, setSearch, setProductNames } = reviewSlice.actions;

export default reviewSlice.reducer;
