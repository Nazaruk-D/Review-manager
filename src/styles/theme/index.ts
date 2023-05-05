import { PaletteMode } from '@mui/material';
import { tokens } from './tokens';

export const themeSettings = (mode: PaletteMode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode as PaletteMode,
            ...(mode === 'dark'
                ? {
                      primary: {
                          main: colors.paleSky[100],
                      },
                      secondary: {
                          main: colors.eastBay[800],
                      },
                      neutral: {
                          dark: colors.paleSky.DEFAULT,
                          light: colors.paleSky[50],
                      },
                      background: {
                          default: colors.paleSky[200],
                          paper: colors.paleSky[100],
                      },
                  }
                : {
                      primary: {
                          main: colors.paleSky[600],
                      },
                      secondary: {
                          main: colors.eastBay.DEFAULT,
                      },
                      neutral: {
                          dark: colors.paleSky.DEFAULT,
                          light: colors.paleSky[50],
                      },
                      background: {
                          default: '#FFFFFF',
                          paper: '#FFFFFF',
                      },
                  }),
        },
        typography: {
            fontFamily: ['Montserrat', 'sans-serif'].join(','),
            fontSize: 14,
            fontWeight: 500,
            h1: {
                fontFamily: ['Montserrat', 'sans-serif'].join(','),
                fontSize: 28,
                fontWeight: 600,
            },
            h2: {
                fontFamily: ['Montserrat', 'sans-serif'].join(','),
                fontSize: 20,
                fontWeight: 600,
            },
            h3: {
                fontFamily: ['Montserrat', 'sans-serif'].join(','),
                fontSize: 18,
                fontWeight: 600,
            },
            p: {
                fontFamily: ['Montserrat', 'sans-serif'].join(','),
                fontSize: 14,
                fontWeight: 500,
            },
        },
    };
};
