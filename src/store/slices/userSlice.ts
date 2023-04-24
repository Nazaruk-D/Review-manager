import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types/UserType';
import { RoleType } from '../../types/RoleType';
import { Role } from '../../enums/role';

interface UserState {
    user: UserType | null;
    role: RoleType;
    isLoggedIn: boolean;
    isBlocked: boolean;
}

const initialState: UserState = {
    user: null,
    role: Role.User,
    isLoggedIn: false,
    isBlocked: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, { payload }: PayloadAction<UserType | null>) {
            state.user = payload;
            state.role = payload!.role;
        },

        setLoggedIn(state, { payload }: PayloadAction<boolean>) {
            state.isLoggedIn = payload;
        },

        setLoggedOut(state) {
            state.user = null;
            state.role = Role.User;
            state.isLoggedIn = false;
        },
    },
});

export const { setUser, setLoggedIn, setLoggedOut } = userSlice.actions;

export default userSlice.reducer;
