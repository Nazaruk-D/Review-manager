import { AppRootStateType } from '../store';

export const selectorUserReviews = (state: AppRootStateType) => state.review.usersReview;
