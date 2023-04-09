import { createSlice } from '@reduxjs/toolkit';
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
    reducers: {},
});

export default appSlice.reducer;
