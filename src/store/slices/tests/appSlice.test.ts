import reducer, { setInitialized, setAppErrorAC, setAppInformMessage, setAppThemeAC, InitialStateType } from '../appSlice';

describe('appSlice reducer', () => {
    const initialState: InitialStateType = {
        initialized: false,
        error: null,
        informMessage: null,
        themeColor: 'light',
    };

    it('should handle setInitialized', () => {
        const state = reducer(initialState, setInitialized());
        expect(state.initialized).toEqual(true);
    });

    it('should handle setAppErrorAC', () => {
        const error = 'Some error message';
        const state = reducer(initialState, setAppErrorAC(error));
        expect(state.error).toEqual(error);
    });

    it('should handle setAppInformMessage', () => {
        const message = 'Some inform message';
        const state = reducer(initialState, setAppInformMessage(message));
        expect(state.informMessage).toEqual(message);
    });

    it('should handle setAppThemeAC', () => {
        const state = reducer(initialState, setAppThemeAC('dark'));
        expect(state.themeColor).toEqual('dark');
    });
});
