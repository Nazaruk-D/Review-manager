import reviewReducer, { setUsersReview, setTags, setSearch, setProductNames, InitialStateType } from '../reviewSlice';
import { ReviewResponseType } from '../../../types/ReviewResponseType';
import { CategoryFilterType } from '../../../types/CategoryFilterType';
import { Category } from '../../../enums/category';

describe('reviewSlice reducer', () => {
    const initialState: InitialStateType = {
        search: '',
        usersReview: null,
        tags: null,
        productNames: null,
    };

    it('should handle setUsersReview', () => {
        const testReview: ReviewResponseType[] = [
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
        ];
        expect(reviewReducer(initialState, setUsersReview(testReview))).toEqual({ ...initialState, usersReview: testReview });
    });

    it('should handle setTags', () => {
        const testTags: string[] = ['test', 'test2'];
        expect(reviewReducer(initialState, setTags(testTags))).toEqual({ ...initialState, tags: testTags });
    });

    it('should handle setProductNames', () => {
        const testNames: string[] = ['product1', 'product2'];
        expect(reviewReducer(initialState, setProductNames(testNames))).toEqual({ ...initialState, productNames: testNames });
    });

    it('should handle setSearch', () => {
        const testSearch: string = 'test search';
        expect(reviewReducer(initialState, setSearch(testSearch))).toEqual({ ...initialState, search: testSearch });
    });
});
