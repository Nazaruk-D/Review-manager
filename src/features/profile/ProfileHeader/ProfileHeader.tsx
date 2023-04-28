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
import { useAppDispatch } from '../../../hooks/useRedux';
import { setAppErrorAC } from '../../../store/slices/appSlice';

const ProfileHeader = () => {
    const dispatch = useAppDispatch();
    const { userId = '' } = useParams<string>();
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    const { data, isLoading, error } = useGetUserQuery({ userId });

    if (isLoading) {
        return <Loader />;
    }
    if (error) {
        dispatch(setAppErrorAC('error'));
    }
    const user = data?.data;
    return (
        <Grid container spacing={2} className={s.headerContainer}>
            <Avatar user={user} />
            <ProfileInfo t={t} user={user} />
            <EditProfile t={t} />
        </Grid>
    );
};

export default ProfileHeader;
