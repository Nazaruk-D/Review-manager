import { PaletteMode } from '@mui/material';
import { TokenModes } from '../../types/ChangeThemeTypes';

export const tokens = (mode: PaletteMode): TokenModes => ({
    ...(mode === 'dark'
        ? {
              paleSky: {
                  DEFAULT: '#000000',
                  50: '#050506',
                  100: '#1E2024',
                  200: '#383C43',
                  300: '#515761',
                  400: '#6B7280',
                  500: '#7F8694',
                  600: '#969BA7',
                  700: '#ACB0BA',
                  800: '#C2C5CC',
                  900: '#CDD0D5',
                  950: '#6B7280',
              },
              eastBay: {
                  DEFAULT: '#10131E',
                  50: '#1A1E30',
                  100: '#2D3555',
                  200: '#414C79',
                  300: '#4F5D94',
                  400: '#6170AA',
                  500: '#7C88B9',
                  600: '#96A0C7',
                  700: '#B1B8D5',
                  800: '#CBD0E3',
                  900: '#D9DCEA',
                  950: '#414C79',
              },
          }
        : {
              paleSky: {
                  DEFAULT: '#6B7280',
                  50: '#CDD0D5',
                  100: '#C2C5CC',
                  200: '#ACB0BA',
                  300: '#969BA7',
                  400: '#7F8694',
                  500: '#6B7280',
                  600: '#515761',
                  700: '#383C43',
                  800: '#1E2024',
                  900: '#050506',
                  950: '#000000',
              },
              eastBay: {
                  DEFAULT: '#414C79',
                  50: '#D9DCEA',
                  100: '#CBD0E3',
                  200: '#B1B8D5',
                  300: '#96A0C7',
                  400: '#7C88B9',
                  500: '#6170AA',
                  600: '#4F5D94',
                  700: '#414C79',
                  800: '#2D3555',
                  900: '#1A1E30',
                  950: '#10131E',
              },
          }),
});

export const themeSettings = (mode: PaletteMode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode as PaletteMode,
            ...(mode === 'dark'
                ? {
                      primary: {
                          main: colors.paleSky[200],
                      },
                      secondary: {
                          main: colors.eastBay[800],
                      },
                      neutral: {
                          dark: colors.paleSky.DEFAULT,
                          light: colors.paleSky[50],
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
