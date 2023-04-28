import React from 'react';
import { Container } from '@mui/material';
import BlockReviews from './BlockReviews/BlockReviews';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import TagCloudBox from './TagCloud/TagCloudBox';
import { selectorLatestReviews, selectorPopularReviews } from '../../store/selectors/reviewSelector';

const MainPage = () => {
    const popularReviews = useAppSelector(selectorPopularReviews);
    const latestReviews = useAppSelector(selectorLatestReviews);
    return (
        <Container sx={{ mt: '2rem' }}>
            <TagCloudBox />
            <BlockReviews title="Popular reviews" reviews={popularReviews} />
            <BlockReviews title="Latest added reviews" reviews={latestReviews} />
        </Container>
    );
};

export default MainPage;
