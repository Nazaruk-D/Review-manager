import React, { Suspense, useEffect, useMemo } from 'react';
import './App.css';
import { createClient } from '@supabase/supabase-js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import routes from '../routes/routes';
import { ColorModeContext, useThemeMode } from '../hooks/useThemeMode';
import { useAuthQuery } from '../store/api/authAPI';
import Loader from '../common/components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setLoggedIn, setUser } from '../store/slices/userSlice';
import { selectorInitialized } from '../store/selectors/appSelector';
import { setAppStatusAC, setInitialized } from '../store/slices/appSlice';

const supabase = createClient(
    'https://aprlrxbbzpblszqgsegy.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwcmxyeGJienBibHN6cWdzZWd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0NjUxNzUsImV4cCI6MTk5NzA0MTE3NX0.L465Hij8NrxrRe0aUgWz8IsZyd-mNjE-E1xrnggaSmE',
);

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

    const { data, isLoading, error } = useAuthQuery({});

    useEffect(() => {
        async function getUserData() {
            await supabase.auth.getUser().then((value) => {
                if (value.data?.user) {
                    console.log(value.data.user);
                }
            });
        }
        getUserData();
    }, []);

    useEffect(() => {
        if (error) {
            dispatch(setInitialized());
            dispatch(setAppStatusAC({ status: 'failed' }));
            return;
        }

        if (!isLoading) {
            dispatch(setInitialized());
            if (data) {
                dispatch(setUser(data.data));
                dispatch(setLoggedIn(true));
            }
            dispatch(setAppStatusAC({ status: 'succeeded' }));
        }
    }, [data, error, isLoading]);

    if (!isAppInitialized || isLoading) {
        return <Loader />;
    }

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
