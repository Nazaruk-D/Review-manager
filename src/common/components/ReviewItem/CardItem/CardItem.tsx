import React, { FC } from 'react';
import { Card } from '@mui/material';
import { ReviewResponseType } from '../../../../types/ReviewResponseType';
import PhotoBlock from './PhotoBlock/PhotoBlock';
import InfoBlock from './InfoBlock/InfoBlock';

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
            <PhotoBlock mediaWidth={mediaWidth} reviewImages={review.images} />
            <InfoBlock review={review} paddingLeft={paddingLeft} contentWidth={contentWidth} />
        </Card>
    );
};

export default CardItem;
