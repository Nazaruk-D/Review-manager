import { PaletteMode, Theme } from '@mui/material';

export type ThemeSettings = {
    palette: {
        mode: string;
        primary: {
            main: string;
        };
        secondary: {
            main: string;
        };
        neutral: {
            dark: string;
            light: string;
        };
    };
    typography: {
        fontFamily: string;
        fontSize: number;
        fontWeight: number;
        h1: {
            fontFamily: string;
            fontSize: number;
            fontWeight: number;
        };
        h2: {
            fontFamily: string;
            fontSize: number;
            fontWeight: number;
        };
        h3: {
            fontFamily: string;
            fontSize: number;
            fontWeight: number;
        };
        p: {
            fontFamily: string;
            fontSize: number;
            fontWeight: number;
        };
    };
};

export type TokenColors = {
    DEFAULT: string;
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
};

export type TokenModes = {
    paleSky: TokenColors;
    eastBay: TokenColors;
};

export type ColorModeType = {
    toggleColorMode: () => void;
    mode: PaletteMode;
};

export type ColorModeContextType = {
    toggleColorMode: () => void;
};

export type UseThemeModeReturnType = [Theme, ColorModeContextType, PaletteMode];
