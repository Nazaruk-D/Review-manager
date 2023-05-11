import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import s from './Introduction.module.scss';

const Introduction = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'introduction' });

    return (
        <Box className={s.introductionContainer}>
            <Box>
                <Typography variant="h1" className={s.title}>
                    {t('title')}
                </Typography>
                <Box className={s.description}>{t('description')}</Box>
            </Box>
        </Box>
    );
};

export default Introduction;
