import React from 'react';
import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import CommentsBlock from './CommentsBlock/CommentsBlock';
import SendCommentForm from './SendCommentForm/SendCommentForm';
import ReviewHeader from './ReviewHeader/ReviewHeader';
import ReviewBody from './ReviewBody/ReviewBody';
import { ReviewResponseType } from '../../../types/ReviewResponseType';
import Loader from '../../../common/components/Loader/Loader';

const Review = () => {
    const location = useLocation();
    const review: ReviewResponseType = location.state;

    if (!review) {
        console.log('!!!!!!!!!!!!!!Получить review по ID из URL');
        return <Loader />;
    }

    return (
        <Container sx={{ mt: '1rem' }}>
            <ReviewHeader review={review} />
            <ReviewBody review={review} />
            <SendCommentForm />
            <CommentsBlock />
        </Container>
    );
};

export default Review;
