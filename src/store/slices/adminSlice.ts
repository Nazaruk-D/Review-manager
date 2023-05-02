import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../types/UserType';

type InitialStateType = {
    user: UserType | null;
};

const initialState: InitialStateType = {
    user: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<UserType | null>) {
            state.user = action.payload;
        },
    },
});

export const { setUserData } = adminSlice.actions;

export default adminSlice.reducer;
