import React, { FC } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorUserId } from '../../../store/selectors/userSelector';

type SettingsProfilePropsType = {
    userId: string;
};

const SettingsProfile: FC<SettingsProfilePropsType> = ({ userId }) => {
    const navigate = useNavigate();
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });

    return (
        <Button variant="contained" color="primary" fullWidth onClick={() => navigate(`/create-review/${userId}`)}>
            {t('new review')}
        </Button>
    );
};

export default SettingsProfile;
