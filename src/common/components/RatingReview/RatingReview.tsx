import React, { FC } from 'react';
import { Box, Rating, Typography } from '@mui/material';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorIsLogin, selectorUserId } from '../../../store/selectors/userSelector';
import { useSetRatingMutation } from '../../../store/api/reviewAPISlice';
import { ReviewResponseType } from '../../../types/ReviewResponseType';

type RatingReviewPropsType = {
    review: ReviewResponseType;
};

const RatingReview: FC<RatingReviewPropsType> = ({ review }) => {
    const userId = useAppSelector(selectorUserId);
    const isLogin = useAppSelector(selectorIsLogin);
    const [setRating] = useSetRatingMutation();
    const rated = review.ratings.includes(userId!);

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
                defaultValue={review.avg_rating}
                size="medium"
                sx={rated ? { color: 'rgba(148,148,148,0.5)' } : {}}
                onChange={setRatingHandler}
                onClick={onclickHandler}
                disabled={!isLogin}
            />
            <Typography variant="body1" color="text.secondary" sx={{ ml: 1, fontWeight: 600 }}>
                {review.avg_rating ? review.avg_rating.toFixed(1) : 0}
            </Typography>
        </Box>
    );
};

export default RatingReview;
