import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types/UserType';
import { RoleType } from '../../types/RoleType';

interface UserState {
    user: UserType | null;
    isLoggedIn: boolean;
    isAdmin: RoleType;
}

const initialState: UserState = {
    user: null,
    isLoggedIn: false,
    isAdmin: 'user',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, { payload }: PayloadAction<UserType | null>) {
            state.user = payload;
            state.isAdmin = payload!.role;
        },

        setLoggedIn(state, { payload }: PayloadAction<boolean>) {
            state.isLoggedIn = payload;
        },

        setLoggedOut(state) {
            state.user = null;
            state.isAdmin = 'user';
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, setLoggedIn, setLoggedOut } = userSlice.actions;

export default userSlice.reducer;
