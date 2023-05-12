import React, { FC } from 'react';
import { Card } from '@mui/material';
import ImageBlock from './ImageBlock/ImageBlock';
import InfoBlock from './InfoBlock/InfoBlock';
import { ReviewResponseType } from '../../../../types/ReviewResponseType';

type CardPropsType = {
    review: ReviewResponseType;
    flexDirection: 'row' | 'column';
    mediaWidth: string;
    contentWidth: string;
    paddingLeft: number;
};

const CardItem: FC<CardPropsType> = ({ flexDirection, contentWidth, mediaWidth, review, paddingLeft }) => {
    return (
        <Card sx={{ display: 'flex', flexDirection }}>
            <ImageBlock mediaWidth={mediaWidth} reviewImages={review.images} />
            <InfoBlock review={review} paddingLeft={paddingLeft} contentWidth={contentWidth} flexDirection={flexDirection} />
        </Card>
    );
};

export default CardItem;
