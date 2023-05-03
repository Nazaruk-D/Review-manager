import React, { FC } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
    return (
        <Button variant="contained" fullWidth onClick={() => navigate(`/create-review/${userId}`)} sx={style}>
            {t('new review')}
        </Button>
    );
};

export default NewReviewButton;
