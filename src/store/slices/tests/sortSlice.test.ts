import reducer, { InitialStateType, setCategoryFilter, setReviewFilter, setSearchSort, setSortedReviews } from '../sortSlice';
import { Category } from '../../../enums/category';
import { Sort } from '../../../enums/sort';
import { ReviewResponseType } from '../../../types/ReviewResponseType';

describe('sortSlice', () => {
    const initialState: InitialStateType = {
        sortReviews: null,
        categoryFilter: Category.Empty,
        reviewsFilter: Sort.Empty,
        searchSort: '',
    };
    it('should handle initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setSortedReviews', () => {
        const sortedReviews: ReviewResponseType[] = [
            {
                id: '1',
                updated_at: '05.11.2023',
                created_at: '05.11.2023',
                author_id: '1',
                author_name: 'Alex',
                author_avatar: '',
                avg_rating: 0,
                ratings: [],
                likes: [],
                authorLikes: 3,
                avg_assessment: 4,
                title: 'Test',
                review_title: 'Test',
                category: Category.Sport,
                body: 'test',
                tags: ['test', 'test2'],
                assessment: '5',
                similarReview: [],
            },
            {
                id: '2',
                updated_at: '06.11.2023',
                created_at: '06.11.2023',
                author_id: '2',
                author_name: 'Petr',
                author_avatar: '',
                avg_rating: 2,
                ratings: [],
                likes: [],
                authorLikes: 2,
                avg_assessment: 5,
                title: 'Test2',
                review_title: 'Test2',
                category: Category.Sport,
                body: 'test2',
                tags: ['test3', 'test4'],
                assessment: '6',
                similarReview: [],
            },
        ];
        const actual = reducer(initialState, setSortedReviews(sortedReviews));
        expect(actual.sortReviews).toEqual(sortedReviews);
    });

    it('should handle setCategoryFilter', () => {
        const categoryFilter = 'Books';
        const actual = reducer(initialState, setCategoryFilter(categoryFilter));
        expect(actual.categoryFilter).toEqual(categoryFilter);
    });

    it('should handle setReviewFilter', () => {
        const reviewFilter = 'NameAZ';
        const actual = reducer(initialState, setReviewFilter(reviewFilter));
        expect(actual.reviewsFilter).toEqual(reviewFilter);
    });

    it('should handle setSearchSort', () => {
        const searchSort = 'Search query';
        const actual = reducer(initialState, setSearchSort(searchSort));
        expect(actual.searchSort).toEqual(searchSort);
    });
});
