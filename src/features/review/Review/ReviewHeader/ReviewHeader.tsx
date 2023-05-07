import React, { FC } from 'react';
import { Box, Grid, IconButton, Theme, Typography, useMediaQuery } from '@mui/material';
import dateFormat from 'dateformat';
import { useTranslation } from 'react-i18next';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';
import noImage from '../../../../common/png/logo.png';
import s from './ReviewHeader.module.scss';
import { ReviewResponseType } from '../../../../types/ReviewResponseType';
import RatingReview from '../../../../common/components/RatingReview/RatingReview';
import Like from '../../../../common/components/Like/Like';
import { useAppSelector } from '../../../../hooks/useRedux';
import { selectorRole, selectorUserId } from '../../../../store/selectors/userSelector';
import { Role } from '../../../../enums/role';

type ReviewHeaderPropsType = {
    review: ReviewResponseType;
};

const ReviewHeader: FC<ReviewHeaderPropsType> = ({ review }) => {
    const navigate = useNavigate();
    const userId = useAppSelector(selectorUserId);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const { t: tr } = useTranslation('translation', { keyPrefix: 'review editor' });
    const userID = useAppSelector(selectorUserId);
    const isAdmin = useAppSelector(selectorRole);

    const onEditReviewHandler = () => {
        navigate(`/update-review/${review.id}`);
    };

    const onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(`/profile/${review.author_id}`);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <img
                    src={review.images?.[0] ?? noImage}
                    alt={review.title}
                    className={s.image}
                    style={{
                        width: isMobile ? '100%' : '90%',
                        display: isMobile ? 'block' : 'inline-block',
                        marginTop: isMobile ? '1rem' : 0,
                    }}
                />
            </Grid>
            <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="h4" gutterBottom sx={{ m: 0, mr: 1 }}>
                            {review.review_title}
                        </Typography>
                        {(userID === review.author_id || isAdmin === Role.Admin) && (
                            <IconButton onClick={onEditReviewHandler}>
                                <EditOutlinedIcon />
                            </IconButton>
                        )}
                    </Box>
                    <Like userId={userId!} reviewId={review.id} likes={review.likes} />
                </Box>
                <Typography variant="h5" gutterBottom>
                    {review.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {tr('category')}: {review.category}
                </Typography>
                <Typography variant="body1">
                    {' '}
                    {tr("author's assessment")}: {review.assessment}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    {tr('created by')}{' '}
                    <Typography
                        variant="subtitle2"
                        component="span"
                        color="text.secondary"
                        onClick={onClickHandler}
                        sx={{
                            '&:hover': {
                                cursor: 'pointer',
                                color: 'rgba(255, 99, 71,1)',
                            },
                        }}
                    >
                        {review.author_name}
                    </Typography>{' '}
                    {tr('on')} {dateFormat(review.created_at, 'mm/dd/yyyy')}
                </Typography>
                <RatingReview review={review} />
            </Grid>
        </Grid>
    );
};

export default ReviewHeader;
