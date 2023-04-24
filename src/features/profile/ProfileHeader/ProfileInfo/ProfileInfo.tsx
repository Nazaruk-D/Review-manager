import React, { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { TFunction } from 'i18next';
import dateFormat from 'dateformat';
import s from './ProfileInfo.module.scss';
import { UserType } from '../../../../types/UserType';

type ProfileInfoPropsType = {
    t: TFunction;
    user: UserType;
};

const ProfileInfo: FC<ProfileInfoPropsType> = ({ user, t }) => {
    return (
        <Grid item xs={12} md={8} className={s.profileBlock} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box>
                <Typography variant="h1" gutterBottom>
                    {t('profile info')}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="h3">{t('name')}:</Typography>
                <Typography variant="h3" color="textSecondary" sx={{ ml: 1, mb: 1, fontWeight: 500 }}>
                    {user?.user_name}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="h3">{t('email')}:</Typography>
                <Typography variant="h3" color="textSecondary" sx={{ ml: 1, mb: 1, fontWeight: 500 }}>
                    {user?.email}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="h3">{t('rating')}:</Typography>
                <Typography variant="h3" color="textSecondary" sx={{ ml: 1, mb: 1, fontWeight: 500 }}>
                    rating
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="h3">{t('created')}:</Typography>
                <Typography variant="h3" color="textSecondary" sx={{ ml: 1, fontWeight: 500 }}>
                    {dateFormat(user?.created_at, 'mmmm dS, yyyy, h:MM:ss TT')}
                </Typography>
            </Box>
        </Grid>
    );
};

export default ProfileInfo;
