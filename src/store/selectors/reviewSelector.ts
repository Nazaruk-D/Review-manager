import { AppRootStateType } from '../store';

export const selectorUserReviews = (state: AppRootStateType) => state.review.usersReview;
export const selectorPopularReviews = (state: AppRootStateType) => state.review.popularReview;
export const selectorLatestReviews = (state: AppRootStateType) => state.review.latestReview;
export const selectorTags = (state: AppRootStateType) => state.review.tags;
export const selectorSearchValue = (state: AppRootStateType): string => state.review.search;
