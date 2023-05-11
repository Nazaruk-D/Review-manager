import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type InitialStateType = {
    error: null | string;
    informMessage: null | string;
    themeColor: 'dark' | 'light';
};

const initialState: InitialStateType = {
    error: null,
    informMessage: null,
    themeColor: 'light',
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<null | string>) {
            state.error = action.payload;
        },
        setAppInformMessage(state, action: PayloadAction<null | string>) {
            state.informMessage = action.payload;
        },
        setAppThemeAC(state, action: PayloadAction<'dark' | 'light'>) {
            state.themeColor = action.payload;
        },
    },
});

export const { setAppErrorAC, setAppInformMessage, setAppThemeAC } = appSlice.actions;

export default appSlice.reducer;
