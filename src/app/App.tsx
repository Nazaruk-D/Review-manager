import React, { useMemo, Suspense } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import routes from '../routes/routes';
import { ColorModeContext, useThemeMode } from '../hooks/useThemeMode';
import { useAuthQuery } from '../store/api/authAPI';
import Loader from '../common/components/Loader/Loader';

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

    useAuthQuery({});

    return (
        <div>
            <ColorModeContext.Provider value={memoizedColorModeValue}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Suspense fallback={<Loader />}>
                        <RouterProvider router={router} />
                    </Suspense>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </div>
    );
}

export default App;
