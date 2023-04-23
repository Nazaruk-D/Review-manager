import React from 'react';
import { Container } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import CommentsBlock from './CommentsBlock/CommentsBlock';
import SendCommentForm from './SendCommentForm/SendCommentForm';
import ReviewHeader from './ReviewHeader/ReviewHeader';
import ReviewBody from './ReviewBody/ReviewBody';
import { ReviewResponseType } from '../../../types/ReviewResponseType';
import Loader from '../../../common/components/Loader/Loader';
import { useGetReviewByIdQuery } from '../../../store/api/reviewAPI';

const Review = () => {
    const location = useLocation();
    const { reviewId = '' } = useParams<string>();
    let review: ReviewResponseType = location.state;

    if (!review) {
        const { data, isLoading, isError } = useGetReviewByIdQuery({ reviewId });
        if (data) {
            review = data.data;
        }
        if (isLoading) return <Loader />;
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
