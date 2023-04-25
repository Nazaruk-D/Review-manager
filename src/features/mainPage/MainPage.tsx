import React from 'react';
import { Container } from '@mui/material';
import BlockReviews from './BlockReviews/BlockReviews';
import { useAppDispatch } from '../../hooks/useRedux';
import { useGetLatestReviewsQuery } from '../../store/api/reviewAPI';
import Loader from '../../common/components/Loader/Loader';
import { setAppErrorAC } from '../../store/slices/appSlice';
import TagCloudBox from './TagCloud/TagCloudBox';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading, error } = useGetLatestReviewsQuery({});

    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        dispatch(setAppErrorAC('Error getting reviews'));
    }
    const reviews = data!.data;
    return (
        <Container sx={{ mt: '2rem' }}>
            <BlockReviews title="Popular reviews" reviews={reviews} />
            <BlockReviews title="Latest added reviews" reviews={reviews} />
            <TagCloudBox />
        </Container>
    );
};

export default MainPage;
