import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import dateFormat from 'dateformat';
import { ReviewResponseType } from '../../../types/ReviewResponseType';
import noImage from '../../png/no_image.png';

const StyledCard = styled(Card)({
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    },
    '&:active': {
        transform: 'scale(0.9)',
        boxShadow: 'none',
    },
    '&:hover .MuiButton-root': {
        backgroundColor: '#fff',
        color: '#000',
    },
    cursor: 'pointer',
});

type ReviewItemPropsType = {
    review: ReviewResponseType;
};

const ReviewItem: FC<ReviewItemPropsType> = ({ review }) => {
    const { t } = useTranslation('translation', { keyPrefix: 'poster' });
    return (
        <Grid item xs={12} md={4}>
            <StyledCard>
                <Card>
                    <CardMedia sx={{ height: 240 }} image={review.image ? review.image : noImage} title="review" />
                    <CardContent>
                        <Typography gutterBottom variant="h2" component="h3" color="text.secondary">
                            {review.review_title}
                        </Typography>
                        <Typography gutterBottom variant="h3" component="h3" color="text.secondary">
                            {review.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {t('category')}: {review.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ px: 0, py: 1 }}>
                            {t('assessment')}: {review.rating}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {review.body}
                        </Typography>
                    </CardContent>
                    <CardContent sx={{ px: 2, py: 0 }}>
                        <Rating name="poster-rating" defaultValue={3} size="small" />
                    </CardContent>
                    <CardContent sx={{ px: 2, py: 0 }}>
                        <Typography variant="caption" color="text.secondary">
                            {t('reviewed')}{' '}
                            <Typography variant="subtitle2" component="span" color="text.secondary">
                                {review.author_name}
                            </Typography>
                            , {dateFormat(review.created_at, 'mm/dd/yyyy')}
                        </Typography>
                    </CardContent>
                </Card>
            </StyledCard>
        </Grid>
    );
};

export default ReviewItem;
