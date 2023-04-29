import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewResponseType } from '../../types/ReviewResponseType';

type InitialStateType = {
    popularReview: ReviewResponseType[] | null;
    latestReview: ReviewResponseType[] | null;
    usersReview: ReviewResponseType[] | null;
    tags: string[] | null;
};

const initialState: InitialStateType = {
    popularReview: null,
    latestReview: null,
    usersReview: null,
    tags: null,
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
    },
});

export const { setPopularReview, setUsersReview, setLatestReview, setTags } = reviewSlice.actions;

export default reviewSlice.reducer;
