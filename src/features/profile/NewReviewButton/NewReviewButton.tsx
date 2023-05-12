import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorThemeApp } from '../../../store/selectors/appSelector';
import { buttonStyles } from '../../../styles/common/buttonStyles';

type NewReviewButtonPropsType = {
    userId: string;
};

const NewReviewButton: FC<NewReviewButtonPropsType> = ({ userId }) => {
    const navigate = useNavigate();
    const themeColor = useAppSelector(selectorThemeApp);
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    const style = buttonStyles(themeColor);
    console.log('Button');
    return (
        <Button variant="contained" fullWidth onClick={() => navigate(`/create-review/${userId}`)} sx={style}>
            {t('new review')}
        </Button>
    );
};

export default memo(NewReviewButton);
