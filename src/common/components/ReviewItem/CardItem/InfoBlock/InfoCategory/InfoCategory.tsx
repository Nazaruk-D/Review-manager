import React, { FC } from 'react';
import { TFunction } from 'i18next';
import { Typography } from '@mui/material';
import { getCategoryTranslation } from '../../../../../../utils/getCategoryTranslation';
import { ReviewResponseType } from '../../../../../../types/ReviewResponseType';

type InfoCategoryPropsType = {
    review: ReviewResponseType;
    t: TFunction;
};

const InfoCategory: FC<InfoCategoryPropsType> = ({ review, t }) => {
    return (
        <Typography variant="body2" color="text.secondary">
            {t('category')}: {getCategoryTranslation(review.category)}
        </Typography>
    );
};

export default InfoCategory;
