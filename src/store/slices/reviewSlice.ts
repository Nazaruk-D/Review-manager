import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewResponseType } from '../../types/ReviewResponseType';

type InitialStateType = {
    popularReview: ReviewResponseType[] | null;
    latestReview: ReviewResponseType[] | null;
    usersReview: ReviewResponseType[] | null;
};

const initialState: InitialStateType = {
    popularReview: null,
    latestReview: null,
    usersReview: null,
};

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setPopularReview(state, action: PayloadAction<ReviewResponseType[] | null>) {
            state.popularReview = action.payload;
        },
        setLatestReview(state, action: PayloadAction<ReviewResponseType[] | null>) {
            state.latestReview = action.payload;
        },
        setUsersReview(state, action: PayloadAction<ReviewResponseType[] | null>) {
            state.usersReview = action.payload;
        },
    },
});

export const { setPopularReview, setUsersReview, setLatestReview } = reviewSlice.actions;

export default reviewSlice.reducer;
