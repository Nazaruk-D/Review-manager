import React, { FC } from 'react';
import { Box, Rating, Typography } from '@mui/material';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorUserId } from '../../../store/selectors/userSelector';
import { useSetRatingMutation } from '../../../store/api/reviewAPISlice';
import { ReviewResponseType } from '../../../types/ReviewResponseType';

type RatingReviewPropsType = {
    review: ReviewResponseType;
};

const RatingReview: FC<RatingReviewPropsType> = ({ review }) => {
    const userId = useAppSelector(selectorUserId);
    const [setRating] = useSetRatingMutation();

    const setRatingHandler = (event: React.SyntheticEvent, value: number | null) => {
        if (value && userId && review.id) {
            setRating({ userId, reviewId: review.id, value });
        }
    };

    const onclickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Rating
                name="poster-rating"
                precision={0.5}
                defaultValue={review.rating.avgRating}
                size="medium"
                disabled={review.rating.ratingUsers.includes(userId!)}
                onChange={setRatingHandler}
                onClick={onclickHandler}
            />
            <Typography variant="body1" color="text.secondary" sx={{ ml: 1, fontWeight: 600 }}>
                {review.rating.avgRating ? review.rating.avgRating.toFixed(1) : 0}
            </Typography>
        </Box>
    );
};

export default RatingReview;
