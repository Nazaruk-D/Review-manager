import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
    initialized: boolean;
    error: null | string;
    informMessage: null | string;
    themeColor: 'dark' | 'light';
};

const initialState: InitialStateType = {
    initialized: false,
    error: null,
    informMessage: null,
    themeColor: 'light',
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setInitialized(state) {
            state.initialized = true;
        },
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

export const { setInitialized, setAppErrorAC, setAppInformMessage, setAppThemeAC } = appSlice.actions;

export default appSlice.reducer;
