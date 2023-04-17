import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types/UserType';
import { RoleType } from '../../types/RoleType';

interface UserState {
    user: UserType | null;
    role: RoleType;
    isLoggedIn: boolean;
    isBlocked: boolean;
}

const initialState: UserState = {
    user: null,
    role: 'user',
    isLoggedIn: false,
    isBlocked: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, { payload }: PayloadAction<UserType | null>) {
            state.user = payload;
        },

        setLoggedIn(state, { payload }: PayloadAction<boolean>) {
            state.isLoggedIn = payload;
        },

        setLoggedOut(state) {
            state.user = null;
            state.role = 'user';
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, setLoggedIn, setLoggedOut } = userSlice.actions;

export default userSlice.reducer;
