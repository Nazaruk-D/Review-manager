import React, { FC } from 'react';
import { Grid } from '@mui/material';
import ReviewTags from './ReviewTags/ReviewTags';
import ReviewText from './ReviewText/ReviewText';
import { ReviewResponseType } from '../../../../types/ReviewResponseType';

type ReviewBodyPropsType = {
    review: ReviewResponseType;
};

const ReviewBody: FC<ReviewBodyPropsType> = ({ review }) => {
    return (
        <Grid container sx={{ mt: 2, mb: 2 }}>
            <ReviewTags tags={review.tags} />
            <ReviewText body={review.body} />
        </Grid>
    );
};

export default ReviewBody;
