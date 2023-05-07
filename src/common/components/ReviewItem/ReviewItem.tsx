import React, { FC } from 'react';
import { Card, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { ReviewResponseType } from '../../../types/ReviewResponseType';
import CardItem from './CardItem/CardItem';

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
