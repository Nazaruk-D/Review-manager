import React from 'react';
import { Container } from '@mui/material';
import { useAppSelector } from '../../hooks/useRedux';
import { selectorSearchValue } from '../../store/selectors/reviewSelector';
import { useGetSearchResultQuery } from '../../store/api/itemAPI';
import ReviewItem from '../mainPage/BlockReviews/ReviewItem/ReviewItem';

const ResultPage = () => {
    const searchValue = useAppSelector(selectorSearchValue);
    const { data: reviews, isLoading, isError } = useGetSearchResultQuery({ searchValue });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading data</div>;
    }

    return (
        <Container sx={{ mt: '2rem' }}>
            {reviews &&
                reviews.data.map((review) => (
                    <ReviewItem key={review.id} review={review} flexDirection="row" mediaWidth="30%" contentWidth="70%" />
                ))}
        </Container>
    );
};

export default ResultPage;
