import React from 'react';
import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import CommentsBlock from './CommentsBlock/CommentsBlock';
import SendCommentForm from './SendCommentForm/SendCommentForm';
import ReviewHeader from './ReviewHeader/ReviewHeader';
import ReviewBody from './ReviewBody/ReviewBody';
import { ReviewResponseType } from '../../../types/ReviewResponseType';
import Loader from '../../../common/components/Loader/Loader';
import { useGetReviewByIdQuery } from '../../../store/api/reviewAPI';
import { setAppErrorAC } from '../../../store/slices/appSlice';
import { useAppDispatch } from '../../../hooks/useRedux';

const Review = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    const { reviewId = '' } = useParams<string>();
    let review: ReviewResponseType = location.state;

    if (!review) {
        const { data, isLoading, error } = useGetReviewByIdQuery({ reviewId });
        if (data) {
            review = data.data;
        }
        if (error) {
            dispatch(setAppErrorAC(t('error get review')));
        }
        if (isLoading) return <Loader />;
    }

    return (
        <Container sx={{ mt: '2rem' }}>
            <ReviewHeader review={review} />
            <ReviewBody review={review} />
            <SendCommentForm />
            <CommentsBlock />
        </Container>
    );
};

export default Review;
