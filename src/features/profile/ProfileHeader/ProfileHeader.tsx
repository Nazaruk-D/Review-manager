import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import dateFormat from 'dateformat';
import s from './ProfileHeader.module.scss';
import { useAppSelector } from '../../../hooks/useRedux';
import { selectorUserData } from '../../../store/selectors/userSelector';

const ProfileHeader = () => {
    const [isVisible, setIsVisible] = useState(false);
    const user = useAppSelector(selectorUserData);
    const { t } = useTranslation('translation', { keyPrefix: 'profile' });

    return (
        <Grid container spacing={2} className={s.headerContainer}>
            <Grid
                item
                md={2.2}
                className={s.avaBlock}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
            >
                <img
                    src={
                        user?.avatar ||
                        'https://img.freepik.com/premium-vector/male-avatar-icon-unknown-or-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-on-white-background-vector-illustration_735449-120.jpg'
                    }
                    alt="test"
                    className={s.image}
                />
                {isVisible && (
                    <Box className={s.uploadPhoto}>
                        <Button variant="contained" sx={{ fontSize: '10px', width: '80%' }}>
                            {t('upload photo')}
                        </Button>
                    </Box>
                )}
            </Grid>
            <Grid item className={s.settingsBlock}>
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
                        {dateFormat(user?.createdAt, 'mmmm dS, yyyy, h:MM:ss TT')}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ProfileHeader;
