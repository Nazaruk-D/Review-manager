import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import s from './ProfileHeader.module.scss';
import EditProfile from './EditProfile/EditProfile';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Avatar from './Avatar/Avatar';
import { UserType } from '../../../types/UserType';

type ProfileHeaderPropsType = {
    user: UserType;
};

const ProfileHeader: FC<ProfileHeaderPropsType> = ({ user }) => {
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    return (
        <Grid container spacing={2} className={s.headerContainer}>
            <Avatar user={user} />
            <ProfileInfo t={t} user={user} />
            <EditProfile t={t} />
        </Grid>
    );
};

export default ProfileHeader;
