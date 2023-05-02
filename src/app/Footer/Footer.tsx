import React from 'react';
import { Box, Container, IconButton, Typography } from '@mui/material';
import { Facebook, GitHub, Instagram, LinkedIn } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const { t } = useTranslation('translation', { keyPrefix: 'footer' });
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'background.default',
                textAlign: 'center',
                fontSize: '0.8rem',
                marginTop: 'auto',
                width: '100%',
            }}
        >
            <Container maxWidth="lg" sx={{ p: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <IconButton aria-label="github" color="default" href="https://github.com/Nazaruk-D">
                        <GitHub />
                    </IconButton>
                    <IconButton aria-label="facebook" color="default" href="https://www.facebook.com/nazaruk.dima">
                        <Facebook />
                    </IconButton>
                    <IconButton aria-label="instagram" color="default" href="https://www.instagram.com/nazaruk_dzmitry/">
                        <Instagram />
                    </IconButton>
                    <IconButton aria-label="linkedin" color="default" href="https://www.linkedin.com/in/nazaruk-d/">
                        <LinkedIn />
                    </IconButton>
                </Box>
                <Box sx={{ pb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                        {t('copyright')}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
