import { createContext, useEffect, useMemo, useState } from 'react';
import { createTheme, PaletteMode, Theme } from '@mui/material';
import { themeSettings } from '../styles/theme';
import { ColorModeType, UseThemeModeReturnType } from '../types/ChangeThemeTypes';

export const ColorModeContext = createContext<ColorModeType>({
    toggleColorMode: () => {},
    mode: 'dark',
});

export const useThemeMode = (): UseThemeModeReturnType => {
    const [mode, setMode] = useState<PaletteMode>((localStorage.getItem('colorMode') as PaletteMode) || 'dark');

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
    }, [mode]);
    return [theme, colorMode, mode];
};
