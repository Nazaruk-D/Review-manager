import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import s from './ProfileHeader.module.scss';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorUserData } from '../../../store/selectors/userSelector';
import EditProfile from './EditProfile/EditProfile';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Avatar from './Avatar/Avatar';

const ProfileHeader = () => {
    const user = useAppSelector(selectorUserData);
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });

    return (
        <Grid container spacing={2} className={s.headerContainer}>
            <Avatar user={user!} />
            <ProfileInfo t={t} user={user!} />
            <EditProfile />
        </Grid>
    );
};

export default ProfileHeader;
