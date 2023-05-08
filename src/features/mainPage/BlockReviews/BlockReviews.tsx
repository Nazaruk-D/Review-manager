import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import ReviewItem from '../../../common/components/ReviewItem/ReviewItem';
import { ReviewResponseType } from '../../../types/ReviewResponseType';

type BlockReviewsPropsType = {
    title: string;
    reviews: ReviewResponseType[] | null;
};

const BlockReviews: FC<BlockReviewsPropsType> = ({ title, reviews }) => {
    return (
        <Grid container spacing={2} sx={{ mb: 5 }}>
            <Grid item xs={12}>
                <Typography variant="h4">{title}</Typography>
            </Grid>
            {reviews?.map((review) => (
                <ReviewItem
                    key={review.id}
                    review={review}
                    flexDirection="column"
                    contentWidth="100%"
                    mediaWidth="100%"
                    paddingLeft={0}
                />
            ))}
        </Grid>
    );
};

export default BlockReviews;
