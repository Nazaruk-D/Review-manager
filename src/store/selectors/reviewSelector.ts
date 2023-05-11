import { AppRootStateType } from '../store';

export const selectorUserReviews = (state: AppRootStateType) => state.review.usersReview;
export const selectorTags = (state: AppRootStateType) => state.review.tags;
export const selectorSearchValue = (state: AppRootStateType): string => state.review.search;
export const selectorProductNames = (state: AppRootStateType): string[] | null => state.review.productNames;
