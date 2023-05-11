import userReducer, { setUser, setLoggedIn, setLoggedOut, InitialStateType } from '../userSlice';
import { Role } from '../../../enums/role';
import { UserType } from '../../../types/UserType';

describe('userSlice reducer', () => {
    const initialState: InitialStateType = {
        user: null,
        role: Role.User,
        isLoggedIn: false,
        isBlocked: false,
    };

    it('should handle initial state', () => {
        expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle setUser', () => {
        const userTest: UserType = {
            id: '1',
            email: 'test@test.ru',
            user_name: 'Alex',
            small_photo: '',
            main_photo: '',
            role: Role.User,
            is_blocked: false,
            totalLikes: 0,
        };

        const newState = userReducer(initialState, setUser(userTest));
        expect(newState.user).toEqual(userTest);
        expect(newState.role).toEqual(userTest.role);
        expect(newState.isBlocked).toEqual(userTest.is_blocked);
    });

    it('should handle setLoggedIn', () => {
        const payload = true;

        const newState = userReducer(initialState, setLoggedIn(payload));
        expect(newState.isLoggedIn).toEqual(payload);
    });

    it('should handle setLoggedOut', () => {
        const user: UserType = {
            id: '1',
            email: 'test@test.ru',
            user_name: 'Alex',
            small_photo: '',
            main_photo: '',
            role: Role.User,
            is_blocked: false,
            totalLikes: 0,
        };
        const state = {
            ...initialState,
            user,
            isLoggedIn: true,
        };

        const newState = userReducer(state, setLoggedOut());
        expect(newState).toEqual(initialState);
    });
});
