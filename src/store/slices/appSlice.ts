import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatusType } from '../../types/RequestStatusType';

type InitialStateType = {
    status: RequestStatusType;
    initialized: boolean;
    error: null | string;
};

const initialState: InitialStateType = {
    status: 'loading',
    initialized: false,
    error: null,
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
        setAppErrorAC(state, action: PayloadAction<{ message: null | string }>) {
            state.error = action.payload.message;
        },
    },
});

export const { setAppStatusAC, setInitialized, setAppErrorAC } = appSlice.actions;

export default appSlice.reducer;
