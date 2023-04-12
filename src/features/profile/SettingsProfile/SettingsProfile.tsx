import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SettingsProfile = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });

    return (
        <Button variant="contained" color="primary" fullWidth>
            {t('new review')}
        </Button>
    );
};

export default SettingsProfile;
