import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import s from './ProfileHeader.module.scss';
import EditProfile from './EditProfile/EditProfile';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Avatar from './Avatar/Avatar';
import { UserType } from '../../../types/UserType';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorRole, selectorUserId } from '../../../store/selectors/userSelector';
import { Role } from '../../../enums/role';

type ProfileHeaderPropsType = {
    userProfileData: UserType;
};

const ProfileHeader: FC<ProfileHeaderPropsType> = ({ userProfileData }) => {
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });
    const userID = useAppSelector(selectorUserId);
    const isAdmin = useAppSelector(selectorRole);

    return (
        <Grid container spacing={2} className={s.headerContainer}>
            <Avatar user={userProfileData} />
            <ProfileInfo t={t} user={userProfileData} />
            {(userID === userProfileData.id || isAdmin === Role.Admin) && <EditProfile t={t} />}
        </Grid>
    );
};

export default ProfileHeader;
