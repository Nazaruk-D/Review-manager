import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, CardContent, IconButton, Paper, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import dateFormat from 'dateformat';
import Like from '../../../Like/Like';
import RatingReview from '../../../RatingReview/RatingReview';
import { getCategoryTranslation } from '../../../../../utils/getCategoryTranslation';
import { useAppSelector } from '../../../../../hooks/useRedux';
import { selectorRole, selectorUserId } from '../../../../../store/selectors/userSelector';
import { ReviewResponseType } from '../../../../../types/ReviewResponseType';
import { Role } from '../../../../../enums/role';
import InfoHeader from './InfoHeader/InfoHeader';
import InfoTitle from './InfoTitle/InfoTitle';
import InfoCategory from './InfoCategory/InfoCategory';
import InfoAssessment from './InfoAssessment/InfoAssessment';
import InfoFooter from './InfoFooter/InfoFooter';

type InfoBlockPropsType = {
    review: ReviewResponseType;
    contentWidth: string;
    paddingLeft: number;
    flexDirection: 'row' | 'column';
};

const InfoBlock: FC<InfoBlockPropsType> = ({ review, paddingLeft, contentWidth, flexDirection }) => {
    const { t } = useTranslation('translation', { keyPrefix: 'poster' });

    return (
        <Box sx={{ minHeight: '220px', width: contentWidth, pl: paddingLeft }}>
            <CardContent>
                <InfoHeader review={review} flexDirection={flexDirection} />
                <InfoTitle review={review} />
                <InfoCategory review={review} t={t} />
                <InfoAssessment review={review} t={t} />
            </CardContent>
            <CardContent sx={{ px: 2, py: 0, display: 'flex' }}>
                <RatingReview review={review} />
            </CardContent>
            <CardContent sx={{ px: 2, py: 0, display: 'flex', justifyContent: 'space-between' }}>
                <InfoFooter review={review} t={t} />
            </CardContent>
        </Box>
    );
};

export default InfoBlock;
