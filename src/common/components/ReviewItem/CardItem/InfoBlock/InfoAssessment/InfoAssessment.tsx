import React, { FC } from 'react';
import { TFunction } from 'i18next';
import { Typography } from '@mui/material';
import { ReviewResponseType } from '../../../../../../types/ReviewResponseType';

type InfoAssessmentPropsType = {
    review: ReviewResponseType;
    t: TFunction;
};

const InfoAssessment: FC<InfoAssessmentPropsType> = ({ review, t }) => {
    return (
        <Typography variant="body2" color="text.secondary" sx={{ px: 0, py: 1 }}>
            {t('assessment')}: {review.assessment}
        </Typography>
    );
};

export default InfoAssessment;
