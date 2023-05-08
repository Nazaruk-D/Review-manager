import React from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { ReviewType } from '../../../types/ReviewType';
import { Category } from '../../../enums/category';

const CreateReview = () => {
    const { userId = '' } = useParams<string>();
    const initial: ReviewType = {
        review_title: '',
        title: '',
        category: Category.Empty,
        body: '',
        assessment: '',
        tags: [],
    };
    const image = [''];
    const url = 'create-review';
    return (
        <Container maxWidth="md" sx={{ mt: 3 }}>
            <ReviewForm initial={initial} url={url} images={image} profileId={userId} reviewId="" />
        </Container>
    );
};

export default CreateReview;
