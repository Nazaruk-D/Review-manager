import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import s from './ProfileHeader.module.scss';

const ProfileHeader = () => {
    const [isVisible, setIsVisible] = useState(false);
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
                    src="https://sun9-16.userapi.com/impg/AN-ikCmTp9yLRpLCkoACsL5dMQC9PfxIv9sX-g/zJ5bKUy8JMk.jpg?size=1080x1920&quality=95&sign=0da9f7871dde6f0032cc304b2cd2dec7&type=album"
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
                        Dmitry Nazaruk
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant="h3">{t('email')}:</Typography>
                    <Typography variant="h3" color="textSecondary" sx={{ ml: 1, mb: 1, fontWeight: 500 }}>
                        nazaruk-dima@mail.ru
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
                        22.10.2001
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ProfileHeader;
