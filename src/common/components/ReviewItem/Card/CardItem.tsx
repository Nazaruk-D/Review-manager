import React, { FC } from 'react';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import dateFormat from 'dateformat';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import noImage from '../../../png/logo.png';
import Like from '../../Like/Like';
import RatingReview from '../../RatingReview/RatingReview';
import { useAppSelector } from '../../../../hooks/useRedux';
import { selectorRole, selectorUserId } from '../../../../store/selectors/userSelector';
import { ReviewResponseType } from '../../../../types/ReviewResponseType';
import { Role } from '../../../../enums/role';

type CardPropsType = {
    review: ReviewResponseType;
    flexDirection: 'row' | 'column';
    mediaWidth: string;
    contentWidth: string;
    paddingLeft: number;
};

const CardItem: FC<CardPropsType> = ({ flexDirection, contentWidth, mediaWidth, review, paddingLeft }) => {
    const userId = useAppSelector(selectorUserId);
    const navigate = useNavigate();
    const isAdmin = useAppSelector(selectorRole);

    const { t } = useTranslation('translation', { keyPrefix: 'poster' });

    const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(`profile/${review.author_id}`);
    };

    const onEditReviewHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate(`/update-review/${review.id}`);
    };

    return (
        <Card sx={{ display: 'flex', flexDirection }}>
            <CardMedia sx={{ height: '220px', width: mediaWidth }} image={review.images?.[0] ?? noImage} title="review" />
            <Box sx={{ height: '220px', width: contentWidth, pl: paddingLeft }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant="h4" gutterBottom sx={{ m: 0, mr: 1 }}>
                                {review.review_title}
                            </Typography>
                            {(userId === review.author_id || isAdmin === Role.Admin) && (
                                <IconButton onClick={onEditReviewHandler}>
                                    <EditOutlinedIcon />
                                </IconButton>
                            )}
                        </Box>
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
                            <Typography
                                variant="subtitle2"
                                component="span"
                                color="text.secondary"
                                onClick={onClickHandler}
                                sx={{
                                    '&:hover': {
                                        color: 'rgba(255, 99, 71,1)',
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                {review.author_name}
                            </Typography>
                            <FavoriteIcon sx={{ fontSize: '10px', ml: 0.5, mr: 0.2 }} />
                            {review.authorLikes}
                        </Typography>
                        , {dateFormat(review.created_at, 'mm/dd/yyyy')}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    );
};

export default CardItem;
