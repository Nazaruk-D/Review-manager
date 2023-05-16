import React, {useMemo} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {CssBaseline, ThemeProvider} from '@mui/material';
import routes from '../routes/routes';
import {ColorModeContext, useThemeMode} from '../hooks/useThemeMode';
import {useUserData} from "../hooks/useUserData";

function App() {
    const router = createBrowserRouter(routes);
    const [theme, colorMode, mode] = useThemeMode();

    const memoizedColorModeValue = useMemo(
        () => ({
            toggleColorMode: colorMode.toggleColorMode,
            mode,
        }),
        [colorMode.toggleColorMode, mode],
    );

    useUserData()

    return (
        <ColorModeContext.Provider value={memoizedColorModeValue}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
