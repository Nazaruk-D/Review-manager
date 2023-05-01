import { AppRootStateType } from '../store';

export const sortReviewsSelector = (state: AppRootStateType) => state.sort.sortReviews;
export const categoryFilterSelector = (state: AppRootStateType) => state.sort.categoryFilter;
export const sortReviewsFilterSelector = (state: AppRootStateType) => state.sort.reviewsFilter;
export const sortSearchSortSelector = (state: AppRootStateType) => state.sort.searchSort;
