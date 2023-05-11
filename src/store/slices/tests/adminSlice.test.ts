import adminReducer, { setUserData } from '../adminSlice';
import { UserType } from '../../../types/UserType';
import { Role } from '../../../enums/role';

describe('adminSlice', () => {
    const initialState = {
        user: null,
    };

    const testUser: UserType = {
        id: '1',
        email: 'test@test.ru',
        user_name: 'Alex',
        small_photo: '',
        main_photo: '',
        role: Role.User,
        is_blocked: false,
        totalLikes: 0,
    };

    it('should handle setUserData', () => {
        const action = setUserData(testUser);
        const result = adminReducer(initialState, action);
        expect(result.user).toEqual(testUser);
    });
});
