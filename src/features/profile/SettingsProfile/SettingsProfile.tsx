import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorUserId } from '../../../store/selectors/userSelector';

const SettingsProfile = () => {
    const navigate = useNavigate();
    const userId = useAppSelector(selectorUserId);
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });

    return (
        <Button variant="contained" color="primary" fullWidth onClick={() => navigate(`/create-review/${userId}`)}>
            {t('new review')}
        </Button>
    );
};

export default SettingsProfile;
