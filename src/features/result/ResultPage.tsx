import React, { useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { selectorSearchValue } from '../../store/selectors/reviewSelector';
import { useGetSearchResultQuery } from '../../store/api/itemAPI';
import ReviewItem from '../../common/components/ReviewItem/ReviewItem';
import Loader from '../../common/components/Loader/Loader';
import { setAppErrorAC } from '../../store/slices/appSlice';

const ResultPage = () => {
    const dispatch = useAppDispatch();
    const searchValue = useAppSelector(selectorSearchValue);
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    const { data: reviews, isFetching, isError } = useGetSearchResultQuery({ searchValue }, { skip: searchValue === '' });

    useEffect(() => {
        if (isError) {
            dispatch(setAppErrorAC('Error loading data'));
        }
    }, [dispatch, isError]);

    if (isFetching) {
        return <Loader />;
    }

    return (
        <Container sx={{ mt: '2rem' }}>
            {reviews &&
                reviews.data.map((review) => (
                    <ReviewItem key={review.id} review={review} flexDirection="row" mediaWidth="30%" contentWidth="70%" />
                ))}
            {reviews?.data.length === 0 && (
                <Box sx={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h2"> {t('no reviews found')} </Typography>
                </Box>
            )}
        </Container>
    );
};

export default ResultPage;
