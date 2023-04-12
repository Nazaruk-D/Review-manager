import React, { useMemo, Suspense, useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import routes from '../routes/routes';
import { ColorModeContext, useThemeMode } from '../hooks/useThemeMode';
import { useAuthQuery } from '../store/api/authAPI';
import Loader from '../common/components/Loader/Loader';
import { useAppDispatch } from '../hooks/useRedux';
import { setLoggedIn, setUser } from '../store/slices/userSlice';

function App() {
    const dispatch = useAppDispatch();
    const router = createBrowserRouter(routes);
    const [theme, colorMode, mode] = useThemeMode();
    const memoizedColorModeValue = useMemo(
        () => ({
            toggleColorMode: colorMode.toggleColorMode,
            mode,
        }),
        [colorMode.toggleColorMode, mode],
    );

    const { data } = useAuthQuery({});

    useEffect(() => {
        if (data) {
            dispatch(setUser(data.data));
            dispatch(setLoggedIn(true));
        }
    }, [data]);

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
