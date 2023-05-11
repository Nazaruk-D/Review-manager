import reducer, { setAppErrorAC, setAppInformMessage, setAppThemeAC, InitialStateType } from '../appSlice';

describe('appSlice reducer', () => {
    const initialState: InitialStateType = {
        error: null,
        informMessage: null,
        themeColor: 'light',
    };

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
