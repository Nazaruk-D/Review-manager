import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewResponseType } from '../../types/ReviewResponseType';

type InitialStateType = {
    search: string | '';
    popularReview: ReviewResponseType[] | null;
    latestReview: ReviewResponseType[] | null;
    usersReview: ReviewResponseType[] | null;
    tags: string[] | null;
    productNames: string[] | null;
};

const initialState: InitialStateType = {
    search: '',
    popularReview: null,
    latestReview: null,
    usersReview: null,
    tags: null,
    productNames: null,
};

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setPopularReview(state, action: PayloadAction<ReviewResponseType[]>) {
            state.popularReview = action.payload;
        },
        setLatestReview(state, action: PayloadAction<ReviewResponseType[]>) {
            state.latestReview = action.payload;
        },
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

export const { setPopularReview, setUsersReview, setLatestReview, setTags, setSearch, setProductNames } = reviewSlice.actions;

export default reviewSlice.reducer;
