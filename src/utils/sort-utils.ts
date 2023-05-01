import { ReviewResponseType } from '../types/ReviewResponseType';
import { Sort } from '../enums/sort';
import { Category } from '../enums/category';
import { ReviewFilterType } from '../types/ReviewFilterType';
import { CategoryFilterType } from '../types/CategoryFilterType';

const filterReview = (sortReviews: ReviewResponseType[], filter: ReviewFilterType) => {
    const sortedReviews: ReviewResponseType[] = [...sortReviews];
    switch (filter) {
        case Sort.None || Sort.Empty:
            break;
        case Sort.NameAZ:
            sortedReviews.sort((a, b) => a.review_title.localeCompare(b.review_title));
            break;
        case Sort.NameZA:
            sortedReviews.sort((a, b) => b.review_title.localeCompare(a.review_title));
            break;
        case Sort.DateOldNew:
            sortedReviews.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
            break;
        case Sort.DateNewOld:
            sortedReviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            break;
        case Sort.Likes:
            sortedReviews.sort((a, b) => b.likes.length - a.likes.length);
            break;
        case Sort.Assessment:
            sortedReviews.sort((a, b) => Number(b.assessment) - Number(a.assessment));
            break;
        case Sort.AvgRating:
            sortedReviews.sort((a, b) => b.avg_rating - a.avg_rating);
            break;
        default:
            break;
    }
    return sortedReviews;
};

export const sortReviewsUtil = (
    category: CategoryFilterType,
    filter: ReviewFilterType,
    searchSort: string,
    reviews: ReviewResponseType[],
) => {
    let sortReviews: ReviewResponseType[];
    if (category !== Category.All && category !== Category.Empty) {
        sortReviews = reviews.filter((review) => review.category === category);
    } else {
        sortReviews = reviews;
    }
    const filteredReviews = filterReview(sortReviews, filter);
    const filteredReviewsTemp = filteredReviews.filter((review) =>
        review.review_title.toLowerCase().includes(searchSort.toLowerCase()),
    );
    return filteredReviewsTemp;
};
