import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';
import BlockReviews from './BlockReviews/BlockReviews';
import TagCloudBox from './TagCloud/TagCloudBox';
import { useGetLatestReviewsQuery, useGetPopularReviewsQuery, useGetPopularTagsQuery } from '../../store/api/reviewAPISlice';
import Loader from '../../common/components/Loader/Loader';

const MainPage = () => {
    const { data: latestReview, isLoading: latestReviewLoading } = useGetLatestReviewsQuery({});
    const { data: popularReview, isLoading: popularReviewLoading } = useGetPopularReviewsQuery({});
    const { data: tags, isLoading: tagsLoading } = useGetPopularTagsQuery({});
    const { t } = useTranslation('translation', { keyPrefix: 'main page' });
    const popularTags = tags?.data || [];
    const latestReviews = latestReview?.data || [];
    const popularReviews = popularReview?.data || [];

    if (latestReviewLoading || popularReviewLoading || tagsLoading) {
        return <Loader />;
    }

    return (
        <Container sx={{ mt: '2rem' }}>
            <BlockReviews title={t('popular reviews')} reviews={popularReviews} />
            <BlockReviews title={t('latest reviews')} reviews={latestReviews} />
            <TagCloudBox tags={popularTags} isLoading={tagsLoading} />
        </Container>
    );
};

export default MainPage;
