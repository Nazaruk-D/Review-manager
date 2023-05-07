import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import dateFormat from 'dateformat';
import { NavLink, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ReviewResponseType } from '../../../types/ReviewResponseType';
import noImage from '../../png/logo.png';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorUserId } from '../../../store/selectors/userSelector';
import RatingReview from '../RatingReview/RatingReview';
import Like from '../Like/Like';
import CardItem from './Card/CardItem';

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
    paddingLeft: number;
};

const ReviewItem: FC<ReviewItemPropsType> = ({ flexDirection, contentWidth, mediaWidth, review, paddingLeft }) => {
    return (
        <Grid item xs={12} md={4} sx={{ mb: 2 }}>
            <NavLink to={`/review/${review.id}`} style={{ textDecoration: 'none' }}>
                <StyledCard>
                    <CardItem
                        review={review}
                        flexDirection={flexDirection}
                        contentWidth={contentWidth}
                        mediaWidth={mediaWidth}
                        paddingLeft={paddingLeft}
                    />
                </StyledCard>
            </NavLink>
        </Grid>
    );
};

export default ReviewItem;
