import React, { Suspense, useEffect, useMemo } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import routes from '../routes/routes';
import { ColorModeContext, useThemeMode } from '../hooks/useThemeMode';
import Loader from '../common/components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { selectorInitialized } from '../store/selectors/appSelector';
import { getUserData } from '../utils/getUserData';

function App() {
    const dispatch = useAppDispatch();
    const isAppInitialized = useAppSelector(selectorInitialized);
    const router = createBrowserRouter(routes);
    const [theme, colorMode, mode] = useThemeMode();
    const memoizedColorModeValue = useMemo(
        () => ({
            toggleColorMode: colorMode.toggleColorMode,
            mode,
        }),
        [colorMode.toggleColorMode, mode],
    );

    useEffect(() => {
        getUserData(dispatch);
    }, []);

    return (
        <ColorModeContext.Provider value={memoizedColorModeValue}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Suspense fallback={<Loader />}>
                    <RouterProvider router={router} />
                </Suspense>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
