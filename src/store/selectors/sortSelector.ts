import { AppRootStateType } from '../store';
import { ReviewResponseType } from '../../types/ReviewResponseType';

export const sortReviewsSelector = (state: AppRootStateType): ReviewResponseType[] | null => state.sort.sortReviews;
export const categoryFilterSelector = (state: AppRootStateType) => state.sort.categoryFilter;
export const sortReviewsFilterSelector = (state: AppRootStateType) => state.sort.reviewsFilter;
export const sortSearchSortSelector = (state: AppRootStateType) => state.sort.searchSort;
