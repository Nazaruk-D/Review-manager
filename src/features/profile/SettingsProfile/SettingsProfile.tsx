import React, { FC } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import s from './SettingsProfile.module.scss';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorThemeApp } from '../../../store/selectors/appSelector';

type SettingsProfilePropsType = {
    userId: string;
};

const SettingsProfile: FC<SettingsProfilePropsType> = ({ userId }) => {
    const navigate = useNavigate();
    const isDark = useAppSelector(selectorThemeApp);
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    const style =
        isDark === 'dark'
            ? { backgroundColor: 'primary.dark', color: 'white', '&:hover': { backgroundColor: 'primary.dark' } }
            : {};

    return (
        <Button variant="contained" fullWidth onClick={() => navigate(`/create-review/${userId}`)} sx={style}>
            {t('new review')}
        </Button>
    );
};

export default SettingsProfile;
