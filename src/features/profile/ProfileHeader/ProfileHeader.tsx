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
            {/*<Grid item md={2.2}>*/}
            <Avatar t={t} user={user!} />
            {/*</Grid>*/}
            {/*<Grid item>*/}
            <ProfileInfo t={t} user={user!} />
            {/*</Grid>*/}
            {/*<Grid item>*/}
            <EditProfile />
            {/*</Grid>*/}
        </Grid>
    );
};

export default ProfileHeader;
