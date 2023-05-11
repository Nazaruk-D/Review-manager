import React from 'react';
import { Container } from '@mui/material';
import BlockReviews from './BlockReviews/BlockReviews';
import TagCloudBox from './TagCloud/TagCloudBox';
import { useGetLatestReviewsQuery, useGetPopularReviewsQuery, useGetPopularTagsQuery } from '../../store/api/reviewAPISlice';

const MainPage = () => {
    const { data: latest } = useGetLatestReviewsQuery({});
    const { data: popular } = useGetPopularReviewsQuery({});
    const { data: tags, isLoading } = useGetPopularTagsQuery({});
    const popularTags = tags?.data || [];
    const latestReviews = latest?.data || [];
    const popularReviews = popular?.data || [];

    return (
        <Container sx={{ mt: '2rem' }}>
            <BlockReviews title="Popular reviews" reviews={popularReviews} />
            <BlockReviews title="Latest added reviews" reviews={latestReviews} />
            <TagCloudBox tags={popularTags} isLoading={isLoading} />
        </Container>
    );
};

export default MainPage;
