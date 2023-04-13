import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../../enums/path';

const SettingsProfile = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });

    return (
        <Button variant="contained" color="primary" fullWidth onClick={() => navigate(Path.ReviewForm)}>
            {t('new review')}
        </Button>
    );
};

export default SettingsProfile;
