import { AppRootStateType } from '../store';

export const selectorUserReviews = (state: AppRootStateType) => state.review.usersReview;
export const selectorPopularReviews = (state: AppRootStateType) => state.review.popularReview;
export const selectorLatestReviews = (state: AppRootStateType) => state.review.latestReview;
