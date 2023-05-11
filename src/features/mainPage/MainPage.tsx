import React from 'react';
import { Container } from '@mui/material';
import BlockReviews from './BlockReviews/BlockReviews';
import TagCloudBox from './TagCloud/TagCloudBox';
import { useGetLatestReviewsQuery, useGetPopularReviewsQuery, useGetPopularTagsQuery } from '../../store/api/reviewAPISlice';
import Loader from '../../common/components/Loader/Loader';

const MainPage = () => {
    const { data: latestReview, isLoading: latestReviewLoading } = useGetLatestReviewsQuery({});
    const { data: popularReview, isLoading: popularReviewLoading } = useGetPopularReviewsQuery({});
    const { data: tags, isLoading: tagsLoading } = useGetPopularTagsQuery({});
    const popularTags = tags?.data || [];
    const latestReviews = latestReview?.data || [];
    const popularReviews = popularReview?.data || [];

    if (latestReviewLoading || popularReviewLoading || tagsLoading) {
        return <Loader />;
    }

    return (
        <Container sx={{ mt: '2rem' }}>
            <BlockReviews title="Popular reviews" reviews={popularReviews} />
            <BlockReviews title="Latest added reviews" reviews={latestReviews} />
            <TagCloudBox tags={popularTags} isLoading={tagsLoading} />
        </Container>
    );
};

export default MainPage;
