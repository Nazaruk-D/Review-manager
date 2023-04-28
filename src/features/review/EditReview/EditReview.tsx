import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { useGetReviewByIdQuery } from '../../../store/api/reviewAPISlice';
import Loader from '../../../common/components/Loader/Loader';
import { ReviewResponseType } from '../../../types/ReviewResponseType';
import { useAppDispatch } from '../../../hooks/useRedux';
import { setAppErrorAC } from '../../../store/slices/appSlice';

const EditReview = () => {
    const dispatch = useAppDispatch();
    const { reviewId = '' } = useParams<string>();
    const { data, isLoading, error } = useGetReviewByIdQuery({ reviewId });
    if (error) {
        dispatch(setAppErrorAC('Error loading data'));
    }
    if (isLoading) {
        return <Loader />;
    }
    const review: ReviewResponseType = data!.data;
    const initial = {
        review_title: review.review_title,
        title: review.title,
        category: review.category,
        body: review.body,
        assessment: review.assessment,
        tags: [...review.tags],
    };
    const image = review.image!;
    const profileId = review.author_id;
    const url = 'update-review';
    console.log(image);

    return (
        <Container maxWidth="md" sx={{ mt: 3 }}>
            <ReviewForm initial={initial} url={url} image={image} profileId={profileId} reviewId={reviewId} />
        </Container>
    );
};

export default EditReview;
