import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatusType } from '../../types/RequestStatusType';

type InitialStateType = {
    status: RequestStatusType;
    initialized: boolean;
    error: null | string;
    themeColor: string | null;
};

const initialState: InitialStateType = {
    status: 'loading',
    initialized: false,
    error: null,
    themeColor: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setInitialized(state) {
            state.initialized = true;
        },
        setAppErrorAC(state, action: PayloadAction<null | string>) {
            state.error = action.payload;
        },
        setAppThemeAC(state, action: PayloadAction<string>) {
            state.themeColor = action.payload;
        },
    },
});

export const { setAppStatusAC, setInitialized, setAppErrorAC, setAppThemeAC } = appSlice.actions;

export default appSlice.reducer;
