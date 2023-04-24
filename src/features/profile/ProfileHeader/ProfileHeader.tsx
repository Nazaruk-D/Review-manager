import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import s from './ProfileHeader.module.scss';
import EditProfile from './EditProfile/EditProfile';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Avatar from './Avatar/Avatar';
import { useGetUserQuery } from '../../../store/api/userAPISlice';
import Loader from '../../../common/components/Loader/Loader';

const ProfileHeader = () => {
    const { userId = '' } = useParams<string>();
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    const { data, isLoading } = useGetUserQuery({ userId });

    if (isLoading) {
        return <Loader />;
    }
    const user = data?.data;
    console.log('data:', data);
    return (
        <Grid container spacing={2} className={s.headerContainer}>
            <Avatar user={user} />
            <ProfileInfo t={t} user={user} />
            <EditProfile t={t} userName={user!.user_name} />
        </Grid>
    );
};

export default ProfileHeader;
