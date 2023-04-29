import { createContext, useEffect, useMemo, useState } from 'react';
import { createTheme, PaletteMode, Theme } from '@mui/material';
import { themeSettings } from '../styles/theme';
import { ColorModeType, UseThemeModeReturnType } from '../types/ChangeThemeTypes';
import { useAppDispatch } from './useRedux';
import { setAppThemeAC } from '../store/slices/appSlice';

export const ColorModeContext = createContext<ColorModeType>({
    toggleColorMode: () => {},
    mode: 'dark',
});

export const useThemeMode = (): UseThemeModeReturnType => {
    const dispatch = useAppDispatch();
    const [mode, setMode] = useState<PaletteMode>((localStorage.getItem('colorMode') as PaletteMode) || 'light');

    const colorMode: ColorModeType = useMemo(
        () => ({
            toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
            mode,
        }),
        [setMode, mode],
    );

    const theme: Theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    useEffect(() => {
        localStorage.setItem('colorMode', mode);
        dispatch(setAppThemeAC(mode));
    }, [mode]);
    return [theme, colorMode, mode];
};
