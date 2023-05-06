import React, { useEffect, useMemo } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import routes from '../routes/routes';
import { ColorModeContext, useThemeMode } from '../hooks/useThemeMode';
import Loader from '../common/components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { selectorInitialized } from '../store/selectors/appSelector';
import { getUserData } from '../utils/getUserData';
import { useGetLatestReviewsQuery, useGetPopularReviewsQuery } from '../store/api/reviewAPISlice';
import { ReviewResponseType } from '../types/ReviewResponseType';
import { setLatestReview, setPopularReview } from '../store/slices/reviewSlice';

function App() {
    const dispatch = useAppDispatch();
    const isAppInitialized = useAppSelector(selectorInitialized);
    const router = createBrowserRouter(routes);
    const [theme, colorMode, mode] = useThemeMode();
    const { data: latest } = useGetLatestReviewsQuery({});
    const { data: popular } = useGetPopularReviewsQuery({});
    const latestReviews: ReviewResponseType[] = latest ? latest!.data : [];
    const popularReviews: ReviewResponseType[] = popular ? popular!.data : [];

    const memoizedColorModeValue = useMemo(
        () => ({
            toggleColorMode: colorMode.toggleColorMode,
            mode,
        }),
        [colorMode.toggleColorMode, mode],
    );

    useEffect(() => {
        dispatch(setPopularReview(popularReviews));
        dispatch(setLatestReview(latestReviews));
    }, [latest, popular]);

    useEffect(() => {
        getUserData(dispatch);
    }, []);

    if (!isAppInitialized) {
        return <Loader />;
    }

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
