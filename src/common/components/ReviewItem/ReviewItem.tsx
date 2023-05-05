import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import dateFormat from 'dateformat';
import { NavLink } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ReviewResponseType } from '../../../types/ReviewResponseType';
import noImage from '../../png/logo.png';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorUserId } from '../../../store/selectors/userSelector';
import RatingReview from '../RatingReview/RatingReview';
import Like from '../Like/Like';

const StyledCard = styled(Card)({
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    },
    '&:active': {
        transform: 'scale(0.98)',
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
    flexDirection: 'row' | 'column';
    mediaWidth: string;
    contentWidth: string;
};

const ReviewItem: FC<ReviewItemPropsType> = ({ flexDirection, contentWidth, mediaWidth, review }) => {
    const userId = useAppSelector(selectorUserId);
    const { t } = useTranslation('translation', { keyPrefix: 'poster' });
    return (
        <Grid item xs={12} md={4} sx={{ mb: 2 }}>
            <NavLink to={`/review/${review.id}`} style={{ textDecoration: 'none' }}>
                <StyledCard>
                    <Card sx={{ display: 'flex', flexDirection }}>
                        <CardMedia
                            sx={{ height: '220px', width: mediaWidth }}
                            image={review.image ? review.image : noImage}
                            title="review"
                        />
                        <Box sx={{ height: '220px', width: contentWidth }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography gutterBottom variant="h2" component="h3" color="text.secondary">
                                        {review.review_title}
                                    </Typography>
                                    <Like userId={userId!} reviewId={review.id} likes={review.likes} />
                                </Box>
                                <Typography gutterBottom variant="h3" component="h3" color="text.secondary">
                                    {review.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {t('category')}: {review.category}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ px: 0, py: 1 }}>
                                    {t('assessment')}: {review.assessment}
                                </Typography>
                            </CardContent>
                            <CardContent sx={{ px: 2, py: 0, display: 'flex' }}>
                                <RatingReview review={review} />
                            </CardContent>
                            <CardContent sx={{ px: 2, py: 0 }}>
                                <Typography variant="caption" color="text.secondary">
                                    {t('reviewed')}{' '}
                                    <Typography variant="subtitle2" component="span" color="text.secondary">
                                        {review.author_name}
                                        <FavoriteIcon sx={{ fontSize: '10px', ml: 0.5, mr: 0.2 }} />
                                        {review.authorLikes}
                                    </Typography>
                                    , {dateFormat(review.created_at, 'mm/dd/yyyy')}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </StyledCard>
            </NavLink>
        </Grid>
    );
};

export default ReviewItem;
