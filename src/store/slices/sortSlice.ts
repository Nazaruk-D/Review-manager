import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReviewResponseType } from '../../types/ReviewResponseType';
import { Sort } from '../../enums/sort';
import { Category } from '../../enums/category';
import { CategoryFilterType } from '../../types/CategoryFilterType';
import { ReviewFilterType } from '../../types/ReviewFilterType';

type InitialStateType = {
    sortReviews: ReviewResponseType[] | null;
    categoryFilter: CategoryFilterType;
    reviewsFilter: ReviewFilterType;
    searchSort: string;
};

const initialState: InitialStateType = {
    sortReviews: null,
    categoryFilter: Category.Empty,
    reviewsFilter: Sort.Empty,
    searchSort: '',
};

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSortedReviews(state, action: PayloadAction<ReviewResponseType[]>) {
            state.sortReviews = action.payload;
        },
        setCategoryFilter(state, action) {
            state.categoryFilter = action.payload;
        },
        setReviewFilter(state, action) {
            state.reviewsFilter = action.payload;
        },
        setSearchSort(state, action) {
            state.searchSort = action.payload;
        },
    },
});

export const { setSortedReviews, setCategoryFilter, setReviewFilter, setSearchSort } = sortSlice.actions;

export default sortSlice.reducer;
