import React, { FC } from 'react';
import { Box, CardContent, IconButton, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dateFormat from 'dateformat';
import { Role } from '../../../../../enums/role';
import Like from '../../../Like/Like';
import RatingReview from '../../../RatingReview/RatingReview';
import { ReviewResponseType } from '../../../../../types/ReviewResponseType';
import { useAppSelector } from '../../../../../hooks/useRedux';
import { selectorRole, selectorUserId } from '../../../../../store/selectors/userSelector';
import { getCategoryTranslation } from '../../../../../utils/getCategoryTranslation';

type InfoBlockPropsType = {
    review: ReviewResponseType;
    contentWidth: string;
    paddingLeft: number;
};

const InfoBlock: FC<InfoBlockPropsType> = ({ review, paddingLeft, contentWidth }) => {
    const navigate = useNavigate();
    const isAdmin = useAppSelector(selectorRole);
    const userId = useAppSelector(selectorUserId);
    const { t } = useTranslation('translation', { keyPrefix: 'poster' });

    const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(`/profile/${review.author_id}`);
    };

    const onEditReviewHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        navigate(`/update-review/${review.id}`);
    };

    return (
        <Box sx={{ height: '220px', width: contentWidth, pl: paddingLeft }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h5" component="h5" gutterBottom sx={{ m: 0, mr: 1 }}>
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
                <Box sx={{ height: '35px', display: 'flex', alignItems: 'center' }}>
                    <Typography gutterBottom variant="h3" component="h3" color="text.secondary" sx={{ mr: 1, mb: 0 }}>
                        {review.title}
                    </Typography>
                    <Paper sx={{ p: 0.7, borderRadius: 1, boxShadow: 1 }}>
                        <Typography variant="body2">{review.avg_assessment.toFixed(1)}</Typography>
                    </Paper>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {t('category')}: {getCategoryTranslation(review.category)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ px: 0, py: 1 }}>
                    {t('assessment')}: {review.assessment}
                </Typography>
            </CardContent>
            <CardContent sx={{ px: 2, py: 0, display: 'flex' }}>
                <RatingReview review={review} />
            </CardContent>
            <CardContent sx={{ px: 2, py: 0, display: 'flex', justifyContent: 'space-between' }}>
                <Box>
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
                </Box>
            </CardContent>
        </Box>
    );
};

export default InfoBlock;
